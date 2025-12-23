document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("world-news-list");

  if (!list) {
    console.error("Element world-news-list not found");
    return;
  }
  const RSS_URL = "https://feeds.bbci.co.uk/news/world/rss.xml";
  const PROXY_URL = "https://api.allorigins.win/raw?url=" + encodeURIComponent(RSS_URL);

  fetch(PROXY_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load world news");
      }
      return response.text();
    })
    .then(xmlText => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, "text/xml");

      const items = xml.querySelectorAll("item");

      if (!items.length) {
        list.innerHTML = "<li>No news available</li>";
        return;
      }

      list.innerHTML = "";

      for (let i = 0; i < Math.min(12, items.length); i++) {
        const item = items[i];

        const titleEl = item.querySelector("title");
        const linkEl = item.querySelector("link");

        if (!titleEl || !linkEl) continue;

        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = linkEl.textContent;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = titleEl.textContent;

        li.appendChild(a);
        list.appendChild(li);
      }
    })
    .catch(error => {
      console.error("World news error:", error);
      list.innerHTML = "<li>Failed to load world news</li>";
    });
});
