const from = document.getElementById('from');
const to = document.getElementById('to');

const apiURL = 'https://api.exchangeratesapi.io/latest?base';

fetch(apiURL).then(response => {
    response.json().then(data => {
        const initials = Object.keys(data.rates);
        
        for (let i of initials) {
            const optionFrom = document.createElement('option');
            optionFrom.innerText = i;
            optionFrom.value = i;
            from.appendChild(optionFrom);

            let optionTo = optionFrom.cloneNode(true);
            to.value = initials[1]; //to value start
            to.appendChild(optionTo);
        }
    })
});

const currency = document.getElementById('currency');
const convertBtn = document.getElementById('convert');
const result = document.getElementById('result');
const alertValue = document.querySelector('.alert-value');
const alertFromTo = document.querySelector('.alert-from-to');

convertBtn.addEventListener('click', () => {
    const apiURLSearch = `https://api.exchangeratesapi.io/latest?base=${from.value}&symbols=${to.value}`;
    fetch(apiURLSearch).then(response => {
        response.json().then(data => {       
            if (currency.value === '') {
                alertValue.classList.add('show');
            } else {
                alertValue.classList.remove('show');
            }

            if (from.value === to.value) {
                alertFromTo.classList.add('show');
            } else {
                alertFromTo.classList.remove('show');
            }

            if (currency.value != "" && from.value != to.value) {
                let currencyValue = Number(currency.value);
                let fromValue = Number(Object.values(data.rates)[0])
    
                result.innerHTML = '';
                const span = document.createElement('span');
                span.classList.add('select-value')
                let logo = "<img class='logo-result' src='assets/img/logo-2.svg'>"
    
                span.innerHTML = from.value + logo + to.value;
                result.appendChild(span);    
    
                const div = document.createElement('div');
                div.classList.add('amount');
    
                const h2 = document.createElement('h2');
                h2.innerText = ((currencyValue * fromValue).toFixed(2)).replace('.', ',');
    
                const img = document.createElement('img');
                img.src = `assets/img/flags/${to.value}.png`;
    
                div.appendChild(img);
                div.appendChild(h2);
    
                result.appendChild(div);
            };
        });
    });
});

//Footer
const footer = document.querySelector('footer');

let data = new Date()
let day = data.getDate();
let mouth = data.getMonth() + 1;
let year = data.getUTCFullYear();

footer.innerHTML = `<p>Taxa de câmbio referência ${(day < 10) ? `0${day}` : `${day}`}/${(mouth < 10) ? `0${mouth}` : `${mouth}`}/${year}</p>`;