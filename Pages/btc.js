const btcPriceElement = document.getElementById("btc-price");
let lastPrice = null;

const socket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

socket.onmessage = function(event) {
  const data = JSON.parse(event.data);
  const price = parseFloat(data.p);

  if (lastPrice !== null) {
    if (price > lastPrice) {
      btcPriceElement.style.color = "green";
    } else if (price < lastPrice) {
      btcPriceElement.style.color = "red";
    }
  }

  btcPriceElement.innerText = price.toFixed(2) + " USDT";
  lastPrice = price;
};

socket.onerror = function() {
  btcPriceElement.innerText = "помилка зʼєднання";
};

socket.onclose = function() {
  btcPriceElement.innerText = "зʼєднання закрито";
};

