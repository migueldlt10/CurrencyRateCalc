const currency_one = document.getElementById('currency-one');
const amount_one = document.getElementById('amount-one');
const currency_two = document.getElementById('currency-two');
const amount_two = document.getElementById('amount-two');

const rate_element = document.getElementById('rate');
const swap_element = document.getElementById('swap');

// Fetch rates and update the DOM
function calculate() {
    const currency1 = currency_one.value;
    const currency2 = currency_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency1}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currency2];
            rate_element.innerText = `1 ${currency1} = ${rate} ${currency2}`;

            amount_two.value = (amount_one.value * rate).toFixed(2);
        })
}

// Event Listeneres for 4 different input changes
currency_one.addEventListener('change', calculate);
amount_one.addEventListener('input', calculate);
currency_two.addEventListener('change', calculate);
amount_two.addEventListener('input', calculate);

/* swaps values */
swap_element.addEventListener('click', () => {
    const tmp = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = tmp;
    calculate();
})
calculate();