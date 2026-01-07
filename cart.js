class CartItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const name = this.getAttribute('name');
        const price = parseFloat(this.getAttribute('price'));
        const imgSrc = this.getAttribute('imgSrc');
        let quantity = parseInt(this.getAttribute('quantity'));

        this.innerHTML = `
          <div class="cart-item-card">
            <img class="cart-img" src="${imgSrc}" alt="${name}">
            
            <div class="cart-info">
              <div class="cart-title">${name}</div>
              <div class="cart-quantity">
                <button class="decrease">-</button>
                <span class="quantity">${quantity}</span>
                <button class="increase">+</button>
              </div>
              <button class="remove">הסר פריט</button>
            </div>

            <div class="cart-price">${price}$</div>
          </div>
        `;

        const quantityElement = this.querySelector('.quantity');
        const decreaseButton = this.querySelector('.decrease');
        const increaseButton = this.querySelector('.increase');
        const removeButton = this.querySelector('.remove');

        const updateQuantity = (change) => {
            quantity += change;
            if (quantity < 1) quantity = 1;
            quantityElement.textContent = quantity;
            this.setAttribute('quantity', quantity);
            updateCartStorage();
            updateTotalPrice();
        };

        const removeItem = () => {
            this.remove();
            cartItems = cartItems.filter(item => item.name !== name);
            updateCartStorage();
            updateTotalPrice();
        };

        decreaseButton.addEventListener('click', () => updateQuantity(-1));
        increaseButton.addEventListener('click', () => updateQuantity(1));
        removeButton.addEventListener('click', removeItem);
    }
}
customElements.define('cart-item', CartItem);

const updateCartStorage = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

const cartContainer = document.getElementById('cart-container');
let total = 0;

const updateTotalPrice = () => {
    total = 0;
    cartContainer.querySelectorAll('cart-item').forEach(item => {
        const price = parseFloat(item.getAttribute('price'));
        const quantity = parseInt(item.getAttribute('quantity'));
        total += price * quantity;
    });
    document.getElementById('total-price').textContent = `סה״כ: ₪${total}`;
};

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

cartItems.forEach(item => {
    const cartItemElement = document.createElement('cart-item');
    cartItemElement.setAttribute('name', item.name);
    cartItemElement.setAttribute('price', item.price);
    cartItemElement.setAttribute('imgSrc', item.imgSrc);
    cartItemElement.setAttribute('quantity', item.quantity);
    cartContainer.appendChild(cartItemElement);
});

updateTotalPrice();

const checkoutBtn = document.getElementById('checkout-btn');
const paymentModal = document.getElementById('payment-modal');
const closeBtn = document.querySelector('.close-btn');
const finalAmount = document.getElementById('final-amount');
const finishPayment = document.getElementById('finish-payment');

checkoutBtn.onclick = function () {
    finalAmount.textContent = `₪${total}`;
    paymentModal.style.display = 'flex';
};

closeBtn.onclick = function () {
    paymentModal.style.display = 'none';
};

finishPayment.onclick = function () {
    alert('תודה על הרכישה!');
    paymentModal.style.display = 'none';
    cartItems = [];
    updateCartStorage();
    cartContainer.innerHTML = '';
    updateTotalPrice();
};

