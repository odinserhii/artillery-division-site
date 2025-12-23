async function updateUSDRate() {
    const priceElement = document.getElementById('usd-price');
    // Використовуємо надійне, сумісне з браузерами API
    const url = 'open.er-api.com';

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Помилка сервера API');
        }
        
        const data = await response.json();
        
        if (data && data.rates && data.rates.UAH) {
            const rate = data.rates.UAH.toFixed(2);
            priceElement.textContent = `${rate} грн`;
        } else {
            priceElement.textContent = 'Дані недоступні';
        }
    } catch (error) {
        console.error("Помилка:", error);
        priceElement.textContent = 'Помилка завантаження курсу';
    }
}

updateUSDRate();
