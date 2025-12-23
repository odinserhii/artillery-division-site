const container = document.getElementById("ua-news");

const RSS_URL = "https://www.ukrinform.ua/rss/block-lastnews";
const PROXY_URL = "https://corsproxy.io/?" + encodeURIComponent(RSS_URL);

fetch(PROXY_URL)
  .then(res => res.text())
  .then(xml => {
    const parser = new DOMParser();
    const data = parser.parseFromString(xml, "text/xml");

    const item = data.querySelector("item");

    if (!item) {
      container.innerText = "Новин немає";
      return;
    }

    const title = item.querySelector("title").textContent;
    const link = item.querySelector("link").textContent;

    container.innerHTML = `
      <a href="${link}" target="_blank" rel="noopener">
        ${title}
      </a>
    `;
  })
  .catch(error => {
    console.error(error);
    container.innerText = "Не вдалося завантажити новину";
  });
