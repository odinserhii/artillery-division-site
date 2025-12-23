const newsList = document.getElementById("ukraine-news-list");

// RSS → через проксі (щоб обійти CORS)
const RSS_URL = "https://suspilne.media/rss/news.xml";
const PROXY_URL = "https://api.allorigins.win/raw?url=" + encodeURIComponent(RSS_URL);

fetch(PROXY_URL)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const items = data.querySelectorAll("item");
    newsList.innerHTML = "";

    items.forEach((item, index) => {
      if (index >= 5) return; // показуємо 5 новин

      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;

      const li = document.createElement("li");
      li.innerHTML = `<a href="${link}" target="_blank" rel="noopener">${title}</a>`;
      newsList.appendChild(li);
    });
  })
  .catch(error => {
    newsList.innerHTML = "<li>Не вдалося завантажити новини</li>";
    console.error("RSS error:", error);
  });
