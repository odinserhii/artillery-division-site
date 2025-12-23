document.addEventListener("DOMContentLoaded", () => {
  const btcUsdEl = document.getElementById("btc-usd");
  const btcUahEl = document.getElementById("btc-uah");
  const usdUahEl = document.getElementById("usd-uah");
  const goldUsdEl = document.getElementById("gold-usd");
  const goldUahEl = document.getElementById("gold-uah");

  if (!btcUsdEl || !btcUahEl || !usdUahEl || !goldUsdEl || !goldUahEl) return;

  // -------- USD → UAH --------
  fetch("https://api.exchangerate.host/latest?base=USD&symbols=UAH")
    .then(res => res.json())
    .then(data => {
      const usdToUah = data.rates.UAH;
      usdUahEl.innerText = usdToUah.toFixed(2) + " UAH";

      // -------- BTC --------
      fetch("https://api.coindesk.com/v1/bpi/currentprice/BTC.json")
        .then(res => res.json())
        .then(btcData => {
          const btcUsd = btcData.bpi.USD.rate_float;
          btcUsdEl.innerText = btcUsd.toFixed(2) + " USD";
          btcUahEl.innerText = (btcUsd * usdToUah).toFixed(2) + " UAH";
        })
        .catch(() => {
          btcUsdEl.innerText = "Error";
          btcUahEl.innerText = "Error";
        });

      // -------- Gold --------
      fetch("https://api.exchangerate.host/latest?base=USD&symbols=XAU")
        .then(res => res.json())
        .then(goldData => {
          const usdPerOz = 1 / goldData.rates.XAU; // USD за унцію золота
          goldUsdEl.innerText = usdPerOz.toFixed(2) + " USD";
          goldUahEl.innerText = (usdPerOz * usdToUah).toFixed(2) + " UAH";
        })
        .catch(() => {
          goldUsdEl.innerText = "Error";
          goldUahEl.innerText = "Error";
        });

    })
    .catch(() => {
      usdUahEl.innerText = "Error";
      btcUsdEl.innerText = "Error";
      btcUahEl.innerText = "Error";
      goldUsdEl.innerText = "Error";
      goldUahEl.innerText = "Error";
    });
});
