const list = document.getElementById("ukraine-news-list");

const RSS_URL = "https://www.ukrinform.ua/rss/block-lastnews";
const PROXY_URL = "https://corsproxy.io/?" + encodeURIComponent(RSS_URL);

fetch(PROXY_URL)
  .then(res => res.text())
  .then(xml => {
    const parser = new DOMParser();
    const data = parser.parseFromString(xml, "text/xml");

    const items = data.querySelectorAll("item");

    if (!items.length) {
      list.innerHTML = "<li>Новин немає</li>";
      return;
    }

    list.innerHTML = ""; // очищаємо список

    // беремо ПЕРШІ 5 новин
    items.forEach((item, index) => {
      if (index >= 8) return;

      const title = item.querySelector("title")?.textContent;
      const link = item.querySelector("link")?.textContent;

      const li = document.createElement("li");
      li.innerHTML = `
        <a href="${link}" target="_blank" rel="noopener">
          ${title}
        </a>
      `;

      list.appendChild(li);
    });
  })
  .catch(error => {
    console.error(error);
    list.innerHTML = "<li>Не вдалося завантажити новини</li>";
  });
