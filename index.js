// FRONT PAGE
const main = document.querySelector('.main');
const header = document.querySelector('.header')
const productsSection = document.querySelector('.products');

// MANAGE SECTION
const manageSection = document.querySelector('.manage');
const manageForm = document.querySelectorAll('.manage__form');
const manageTitle = document.querySelector('.manage__title--h2');
const manageProduct = document.querySelector('.manage__product');
const managePrice = document.querySelector('.manage__price');
const manageBtn = document.querySelector('.manage__btn');

// QUANTITY
const manageQuantity = document.querySelector('.manage__quantity');
const quantityInput = document.querySelector('.quantity__input');
const btnMinus = document.querySelector('.btn__quantity--minus');
const btnPlus = document.querySelector('.btn__quantity--plus');
const quantityButtons = document.querySelectorAll('.btn__quantity');
const btnRemove = document.querySelector('.btn__remove');

// BASKET
const btnBasket = document.querySelector('.btn__basket');
const basketQuantity = document.querySelector('.basket__quantity--output');
const basketPrice = document.querySelector('.basket__price');
const btnPrice = document.querySelector('.btn__price');

// ORDERS
const manageOrders = document.querySelector('.manage__orders');
const totalPrice = document.querySelector('.total__price');
const tableOutput = document.querySelector('.table__number--output');
const tableSelect = document.querySelector('.table__number--select');
const orderTable = document.querySelector('.order__table');
const itemsContainer = document.querySelector('.items__container');
const btnOrder = document.querySelector('.btn__order');

// BACK
const backSurface = document.querySelector('.btn__surface-back');
const backArrow = document.querySelector('.btn__back');

// CURRENCY
const locale = 'en-UK';
const currency = 'GBP';

// PRODUCTS DATA

espresso = {
    name: 'Espresso',
    price: 2.90
}

doubleEspresso = {
    name: 'Double Espresso',
    price: 3.50
}

americano = {
    name: 'Americano',
    price: 3.50
}

flatWhite = {
    name: 'Flat White',
    price: 3.70,
}

cappuccino = {
    name: 'Cappuccino',
    price: 3.90
}

latte = {
    name: 'Latte',
    price: 3.90
}

icedLatte = {
    name: 'Iced Latte',
    price: 3.90
}

coffeeData = [espresso, doubleEspresso, americano, flatWhite, cappuccino, latte, icedLatte];

// ORDER DATABASE

function BasketOrder(name, price, quantity, currency) {
    
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.currency = currency;
}

const basketOrders = [];

// DISPLAY PRODUCTS SECTION

const displayProductsSection = function() {

    header.style.display = 'block';
    productsSection.style.display = 'grid';
    manageSection.style.display = 'none';
    backSurface.classList = 'btn btn__surface-back btn__surface-back--inactive';
}

// FORMAT CURRENCY

const formatCurrency = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
};

// DISPLAY MANAGE SECTION

const displayManageSection = function(coffee, quantity, ordered) {
    
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
    manageOrders.style.display = 'none';
    manageQuantity.style.display = 'block';

    quantityInput.value = quantity;
    btnBasket.style.display = 'none';

    const coffeePrice = formatCurrency(coffee.price, locale, currency);
    manageProduct.textContent = coffee.name;
    managePrice.textContent = coffeePrice;
    btnPrice.textContent = coffeePrice;
    itemsContainer.addEventListener('mouseover', ev => ev.target.closest('.order__row').style.cursor = !orderComplete ? 'pointer' : 'inherit');
    backSurface.classList = 'btn btn__surface-back btn__surface-back--active';
}

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
    managePrice.value = formatCurrency(changedPrice, locale, currency);
    btnPrice.textContent = formatCurrency(changedPrice, locale, currency);
};

// CALCULATE TOTAL PRICE 

const calculateTotalPrice = function(orders) {

    const total = orders.map(function(order) {
        return order.price;
    }).reduce(function(acc, curr) {
        return acc + curr;
    })

    return total;
}

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

let orderComplete = false;

const updateOrder = function(coffee) {

    if (manageBtn.classList.contains('manage__btn--add')) {

        addOrder(coffee);
    }

    if (manageBtn.classList.contains('manage__btn--edit')) {

        deleteOrder(basketOrders, coffee);
        addOrder(coffee);
    }

    if (manageBtn.classList.contains('manage__btn--complete')) {

        console.log('order complete');
        orderComplete = true;
        btnBasket.innerHTML = 'Your order';
    }
}

// DISPLAY BASKET

const displayReference = function() {

    if (basketOrders.length > 0) {

        main.style.paddingBottom = '96px';

        const quantity = basketOrders.map(function(order) {
            return Number(order.quantity);
        }).reduce(function(acc, curr) {
            return acc + curr;
        })

        const total = calculateTotalPrice(basketOrders);

        btnBasket.style.display = !orderComplete ? 'grid' : 'block';
        basketQuantity.textContent = quantity;
        basketPrice.textContent = formatCurrency(total, locale, currency);
    }
}

// OPEN BASKET

const displayBasketOrders = function(orders) {

    header.style.display = 'none';
    productsSection.style.display = 'none';
    manageSection.style.display = 'block';
    manageQuantity.style.display = 'none';
    manageOrders.style.display = 'block';
    btnBasket.style.display = 'none';
    btnOrder.textContent = 'Complete order';
    btnPrice.textContent = 'price';
    itemsContainer.innerHTML = '';
    backSurface.classList = 'btn btn__surface-back btn__surface-back--active';

    orders.forEach(function(order) {
        
        const quantity = order.quantity;
        const product = order.name;
        const price = formatCurrency(order.price, locale, currency);
        
        const orderRow = `
            <div class="order__row" data-tab="${product}">
                <div class="order__row--product">
                    <span class="product__quantity">${quantity}</span>
                    <span class="product__name">${product}</span>
                </div>
                <div class="order__row--price">${price}</div>
            </div>
        `

        itemsContainer.insertAdjacentHTML('beforeend', orderRow);
    })

    const total = calculateTotalPrice(orders);
    totalPrice.textContent = formatCurrency(total, locale, currency);
    btnPrice.textContent = formatCurrency(total, locale, currency);

    if (!orderComplete) {

        manageTitle.textContent = 'Basket';
        manageBtn.classList = 'btn manage__btn manage__btn--complete';
    } else {

        tableOutput.innerHTML = tableSelect.value;
        manageTitle.textContent = 'Your Order';
        tableSelect.style.display = 'none';
        manageBtn.style.display = 'none';
    }
}

// OPEN ITEM MANAGE SECTION

let selectedCoffee;

const openItem = function(clicked) {

    if (!orderComplete) {

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
    } else {

        displayCompleteReference();
    }
}

// DISPLAY COMPLETE ORDER REFERENCE

const displayCompleteReference = function() {

    console.log('order complete reference')

    const completeReference = `
        <div class="complete__reference">
            <p>Your order has been placed. Please refresh the page to place another one.</p>
        </div>
    `;
    
    manageSection.style.display = 'none';
    main.insertAdjacentHTML('beforeend', completeReference);

    setTimeout(() => {
        document.querySelector('.complete__reference').classList.add('complete__reference--active');
    }, 100);
}

// DISPLAY COFFEE

coffeeData.forEach(function(coffee) {

    const coffeePrice = formatCurrency(coffee.price, locale, currency);
    
    const coffeeSelector = `
        <div class="coffee" data-tab="${coffee.name}">
            <p class="coffee__type">${coffee.name}</p>
            <p class="coffee__price">${coffeePrice}</p>
        </div>
    ` 

    productsSection.insertAdjacentHTML('beforeend', coffeeSelector);
})

// SELECTING COFFEE 

productsSection.addEventListener('click', function(ev) {

    const clicked = ev.target.closest('.coffee');
    openItem(clicked);
})

// QUANTITY BUTTONS

quantityButtons.forEach(function(button) {

    button.addEventListener('click', function(ev) {
        ev.preventDefault();

        const quantitySelector = button.classList.contains('btn__quantity--plus') ? 'plus' : 'minus';

        changeQuantity(quantitySelector, selectedCoffee);
    })
});

// REMOVE FROM ORDER

btnRemove.addEventListener('click', function(ev) {
    ev.preventDefault();

    deleteOrder(basketOrders, selectedCoffee);
    displayProductsSection();
    displayReference();
})

// MANAGE BUTTON

manageBtn.addEventListener('click', function(ev) {
    ev.preventDefault();

    updateOrder(selectedCoffee);
    displayProductsSection();
    displayReference();
})

// SELECT BASKET

btnBasket.addEventListener('click', function(ev) {
    ev.preventDefault();

    displayBasketOrders(basketOrders);
})

// SELECT BASKET ITEM

itemsContainer.addEventListener('click', function(ev) {
    ev.preventDefault();

    const clicked = ev.target.closest('.order__row');
    console.log(clicked);

    openItem(clicked);
})

// GO BACK

backArrow.addEventListener('click', function(ev) {
    ev.preventDefault();

    displayProductsSection();
    displayReference();
})

backSurface.addEventListener('click', function() {

    displayProductsSection();
    displayReference();
})

// DESKTOP

if (screen.width > 1200) {

    backArrow.style.display = 'none';
}

