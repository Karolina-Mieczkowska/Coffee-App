const header = document.querySelector('.header')
const productsSection = document.querySelector('.products');
const manageSection = document.querySelector('.manage');
// const coffeeSelector = document.querySelectorAll('.coffee');
const manageForm = document.querySelectorAll('.manage__form');
// const main = document.querySelector('.main');
const manageTitle = document.querySelector('.manage__title--h2');


// manageSection.style.display = 'block';
// document.querySelector('body').style.overflow = 'hidden';

// const gogo = 50;

// const html = `
//     <h1>Paaay! ${gogo}</h1>
// `

// manageSection.innerHTML = html;

// coffeeSelector.forEach(function(selecor) {
//     selecor.addEventListener('click', function() {
//         console.log('works')
//     })
// })

// PRODUCTS DATA

espresso = {
    name: 'Espresso',
    price: 2.90,
    locale: 'en-UK',
    currency: 'GBP'
}

doubleEspresso = {
    name: 'Double Espresso',
    price: 3.50,
    locale: 'en-UK',
    currency: 'GBP'
}

americano = {
    name: 'Americano',
    price: 3.50,
    locale: 'en-UK',
    currency: 'GBP'
}

flatWhite = {
    name: 'Flat White',
    price: 3.70,
    locale: 'en-UK',
    currency: 'GBP'
}

latte = {
    name: 'Latte',
    price: 3.90,
    locale: 'en-UK',
    currency: 'GBP'
}

icedLatte = {
    name: 'Iced Latte',
    price: 3.90,
    locale: 'en-UK',
    currency: 'GBP'
}

coffeeData = [espresso, doubleEspresso, americano, flatWhite, latte, icedLatte];

// ORDER DATABASE

function BasketOrder(title, price, quantity) {
    
    this.selectedProductTitle = title;
    this.selectedProductPrice = price;
    this.selectedProductQuantity = quantity;
}

const basketOrders = [];

// FORMAT CURRENCY

const formatCurrency = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
};

// QUANTITY FUNCTION

const changeQuantity = function(selector, product) {

    if (selector === 'plus' && quantityInput.value >= 1) {
        
        quantityInput.value++
        btnMinus.classList.remove('state--inactive');
        
    } else if (selector === 'minus' && document.querySelector('.quantity__input').value != 1) {
        
        quantityInput.value--
    } 

    if (selector === 'minus' && quantityInput.value == 1) {

        btnMinus.classList.add('state--inactive');
        quantityInput.value;
    }

    const changedPrice = product.price * quantityInput.value
    managePrice.value = formatCurrency(changedPrice, product.locale, product.currency);
    btnPrice.textContent = formatCurrency(changedPrice, product.locale, product.currency);
};

// UPDATE BASKET

const updateBasket = function(coffee) {

    console.log(coffee.name);
    console.log(managePrice.value);
    console.log(quantityInput.value);
    
    const newOrder = new BasketOrder(coffee.name, managePrice.value, quantityInput.value);
    basketOrders.push(newOrder);
}

// DISPLAY PRODUCTS SECTION

const displayProductsSection = function() {

    header.style.display = 'block';
    productsSection.style.display = 'grid';
    manageSection.style.display = 'none';
}

// DISPLAY BASKET

const displayBasket = function() {

    
}

// DISPLAY MANAGE SECTION

const displayManageSection = function(selector) {

    const selectedCoffee = coffeeData.find(function(coffee) {
        return coffee.name === selector.dataset.tab;
    })

    manageTitle.textContent = 'Choose quantity';

    console.log(selectedCoffee);

    const coffeePrice = formatCurrency(selectedCoffee.price, selectedCoffee.locale, selectedCoffee.currency);

    header.style.display = 'none';
    productsSection.style.display = 'none';
    manageSection.style.display = 'block';

    const manageForm = document.createElement('form');

    manageForm.classList.add('manage__form');
    manageForm.classList.add('manage__form--choose');

    const formContent = `
        <div class="manage__quantity">
            <p class="manage__product manage__product--choose">${selectedCoffee.name}</p>
            <output class="manage__price manage__price--choose">${coffeePrice}</output>
            <button class="btn btn__quantity btn__quantity--minus state--inactive">&#8722;</button>
            <input type="number" value="1" class="quantity__input quantity__input--choose">
            <button class="btn btn__quantity btn__quantity--plus state--active">&#x2B;</button>
        </div>
        <button class="btn manage__btn manage__btn--add" type="submit">
            Add to order
            <span class="btn__price">${coffeePrice}</span>
        </button>
    `

    manageForm.innerHTML = formContent;

    manageSection.appendChild(manageForm)

    quantityButtons = document.querySelectorAll('.btn__quantity');
    quantityInput = document.querySelector('.quantity__input');
    btnMinus = document.querySelector('.btn__quantity--minus');
    managePrice = document.querySelector('.manage__price');
    btnPrice = document.querySelector('.btn__price');
    manageBtn = document.querySelector('.manage__btn');

    quantityButtons.forEach(function(button) {

        button.addEventListener('click', function(ev) {
            ev.preventDefault();

            const quantitySelector = button.classList.contains('btn__quantity--plus') ? 'plus' : 'minus';

            console.log(quantitySelector);

            changeQuantity(quantitySelector, selectedCoffee);
        })
    });

    manageBtn.addEventListener('click', function(ev) {
        ev.preventDefault();

        updateBasket(selectedCoffee);
        displayProductsSection();
    })
}

// dataTab = document.querySelector('.manage__form--any').dataset.tab;

// displayManageSection(dataTab);

// console.log(dataTab)

// SELECTING COFFEE

productsSection.addEventListener('click', function(ev) {

    const clicked = ev.target.closest('.coffee');

    const dataTab = 'choose';

    displayManageSection(clicked);
})

// DISPLAY COFFEE

coffeeData.forEach(function(coffee) {

    const coffeePrice = formatCurrency(coffee.price, coffee.locale, coffee.currency);
    
    const coffeeSelector = `
        <div class="coffee" data-tab="${coffee.name}">
            <p class="coffee__type">${coffee.name}</p>
            <p class="coffee__price">${coffeePrice}</p>
        </div>
    ` 

    productsSection.insertAdjacentHTML('beforeend', coffeeSelector);
})

// displayManageSection();

// ADD QUANTITY

// let quantityButtons;

// quantityButtons.forEach(function(btn) {
    
//     btn.addEventListener('click', function(ev) {
//         ev.preventDefault();

//         changeQuantity();
//     })
// })
