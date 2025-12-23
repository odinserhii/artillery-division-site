document.addEventListener("DOMContentLoaded", () => {
  const goldElement = document.getElementById("gold-price");
  if (!goldElement) return;

  // Використовуємо безкоштовне API через проксі
  const PROXY_URL = "https://api.allorigins.win/raw?url=";
  const GOLD_API_URL = "https://www.metals-api.com/api/latest?base=USD&symbols=XAU";

  fetch(PROXY_URL + encodeURIComponent(GOLD_API_URL))
    .then(res => res.json())
    .then(data => {
      // API повертає ціни XAU (золото) у доларах
      // Перевіряємо структуру відповіді
      if (data && data.rates && data.rates.XAU) {
        const price = 1 / data.rates.XAU; // бо базова валюта USD
        goldElement.innerText = price.toFixed(2) + " USD/oz";
      } else {
        goldElement.innerText = "Error";
      }
    })
    .catch(err => {
      console.error("Gold price error:", err);
      goldElement.innerText = "Error";
    });
});
