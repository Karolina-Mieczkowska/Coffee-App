const header = document.querySelector('.header')
const main = document.querySelector('.main');
const productsSection = document.querySelector('.products');
const manageSection = document.querySelector('.manage');
// const coffeeSelector = document.querySelectorAll('.coffee');
const manageForm = document.querySelectorAll('.manage__form');
// const main = document.querySelector('.main');
const manageTitle = document.querySelector('.manage__title--h2');
const manageProduct = document.querySelector('.manage__product');
const btnPrice = document.querySelector('.btn__price');
const managePrice = document.querySelector('.manage__price');

const quantityButtons = document.querySelectorAll('.btn__quantity');
const quantityInput = document.querySelector('.quantity__input');
const btnMinus = document.querySelector('.btn__quantity--minus');
const manageBtn = document.querySelector('.manage__btn');

const btnBasket = document.querySelector('.btn__basket');
const basketQuantity = document.querySelector('.basket__quantity--output');
const basketPrice = document.querySelector('.basket__price');

const btnPlus = document.querySelector('.btn__quantity--plus');
const btnOrder = document.querySelector('.btn__order');
const btnRemove = document.querySelector('.btn__remove');

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

function BasketOrder(name, price, quantity, currency) {
    
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.currency = currency;
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
        
        quantityInput.value++;
        btnMinus.classList.remove('state--inactive');
        
    } else if (selector === 'minus' && document.querySelector('.quantity__input').value != 1) {
        
        quantityInput.value--
    } 

    if (selector === 'minus' && quantityInput.value == 1) {

        btnMinus.classList.add('state--inactive');
        quantityInput.value;
    }

    const changedPrice = product.price * quantityInput.value;
    managePrice.value = formatCurrency(changedPrice, product.locale, product.currency);
    btnPrice.textContent = formatCurrency(changedPrice, product.locale, product.currency);
};

// ADD ORDER

const addOrder = function(product) {

    const price = product.price * quantityInput.value;
    
    const newOrder = new BasketOrder(product.name, price, quantityInput.value, product.currency);

    basketOrders.push(newOrder);
}

// DELETE ORDER 

const deleteOrder = function(orders, product) {

    const index = orders.findIndex(function(order) {
        return order.name === product.name;
    });

    orders.splice(index, 1);
}

// UPDATE BASKET

const updateBasket = function(coffee) {

    if (manageBtn.classList.contains('manage__btn--add')) {

        addOrder(coffee);
    }

    if (manageBtn.classList.contains('manage__btn--edit')) {

        deleteOrder(basketOrders, coffee);
        addOrder(coffee);
    }

    // const price = coffee.price * quantityInput.value;
    
    // const newOrder = new BasketOrder(coffee.name, price, quantityInput.value, coffee.currency);
    // basketOrders.push(newOrder);
}

// DISPLAY PRODUCTS SECTION

const displayProductsSection = function() {

    header.style.display = 'block';
    productsSection.style.display = 'grid';
    manageSection.style.display = 'none';
}

// DISPLAY BASKET

const displayBasket = function() {

    if (basketOrders.length > 0) {

        main.style.paddingBottom = '96px';

        const quantity = basketOrders.map(function(order) {
            return Number(order.quantity);
        }).reduce(function(acc, curr) {
            return acc + curr;
        })

        const price = basketOrders.map(function(order) {
            return order.price;
        }).reduce(function(acc, curr) {
            return acc + curr;
        })

        btnBasket.style.display = 'grid';
        basketQuantity.textContent = quantity;
        basketPrice.textContent = formatCurrency(price, selectedCoffee.locale, selectedCoffee.currency);
    }
}

// DISPLAY MANAGE SECTION

const displayManageSection = function(coffee, quantity, ordered) {

    // manageTitle.textContent = !ordered ? 'Choose Quantity' : 'Edit quantity';
    // btnOrder.textContent = !ordered ? 'Add to order' : 'Update order';
    // btnRemove.style.display = !ordered ? 'none' : 'inline-block';
    
    if (!ordered) {
        manageTitle.textContent = 'Choose Quantity';
        btnOrder.textContent = 'Add to order';
        btnRemove.style.display = 'none';
        manageBtn.classList = 'btn manage__btn manage__btn--add';
    } else {
        manageTitle.textContent = 'Edit quantity';
        btnOrder.textContent = 'Update order';
        btnRemove.style.display = 'inline-block';
        manageBtn.classList = 'btn manage__btn manage__btn--edit';
    }
  
    header.style.display = 'none';
    productsSection.style.display = 'none';
    manageSection.style.display = 'block';

    quantityInput.value = quantity;
    btnBasket.style.display = 'none';

    const coffeePrice = formatCurrency(coffee.price, coffee.locale, coffee.currency);
    manageProduct.textContent = coffee.name;
    managePrice.textContent = coffeePrice;
    btnPrice.textContent = coffeePrice;
}

// SELECTING COFFEE

let selectedCoffee;

productsSection.addEventListener('click', function(ev) {

    const clicked = ev.target.closest('.coffee');

    selectedCoffee = coffeeData.find(function(coffee) {
        return coffee.name === clicked.dataset.tab;
    })

    const coffeeOrdered = basketOrders.find(function(order) {
        
        return order.name === selectedCoffee.name;
    });

    console.log(coffeeOrdered)
    let ordered;

    if (!coffeeOrdered) {

        displayManageSection(selectedCoffee, 1, ordered = false);
    } else {

        displayManageSection(coffeeOrdered, coffeeOrdered.quantity, ordered = true);
    }
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

// QUANTITY BUTTONS

quantityButtons.forEach(function(button) {

    button.addEventListener('click', function(ev) {
        ev.preventDefault();

        const quantitySelector = button.classList.contains('btn__quantity--plus') ? 'plus' : 'minus';

        changeQuantity(quantitySelector, selectedCoffee);
    })
});

// MANAGE BUTTON

manageBtn.addEventListener('click', function(ev) {
    ev.preventDefault();

    updateBasket(selectedCoffee);
    displayProductsSection();
    displayBasket();
})

// REMOVE FROM ORDER

btnRemove.addEventListener('click', function(ev) {
    ev.preventDefault();

    deleteOrder(basketOrders, selectedCoffee);
    displayProductsSection();
    displayBasket();
})

