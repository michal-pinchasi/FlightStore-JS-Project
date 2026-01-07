class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

  connectedCallback() {
    const productId = parseInt(this.getAttribute('id'));
    const product = products.find(p => p.id === productId);

    if (!product) {
        this.shadowRoot.innerHTML = `<p> המוצר לא נמצא.</p>`;
        return;
    }

    const isSingle = this.getAttribute('mode') === 'single';

    const style = `
    <style>
        * {
            box-sizing: border-box;
        }

        .card {
            background-color: #faf5ef;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            direction: rtl;
            font-family: 'Arial', sans-serif;
            max-width: ${isSingle ? '600px' : '300px'};
            margin: auto;
            text-align: center;
            padding: ${isSingle ? '20px' : '0'};
        }

        .destination {
            background-color: #73c4e6;
            color: #fff;
            font-weight: bold;
            padding: 10px 0;
            font-size: ${isSingle ? '2rem' : '1.2rem'};
            width: 100%;
        }

        img {
            width: 100%;
            height: ${isSingle ? '400px' : '180px'};
            object-fit: cover;
            display: block;
            margin: ${isSingle ? '0 auto 20px auto' : '0'};
          
        }

     

        .info-section {
            background-color: #faf5ef;
            padding: 15px 10px;
            font-size: ${isSingle ? '1.5rem' : '1rem'};
        }

        .price {
            color: #1e293b;
            font-size: ${isSingle ? '2rem' : '1.4rem'};
            font-weight: bold;
            margin-bottom: 5px;
        }

        .sale {
            font-size: 1rem;
            color: #1e293b;
        }

        .button-section {
            background-color: transparent;
            padding: 10px;
        }

        button {
            background-color: #ffc226;
            color: white;
            border: none;
            padding: ${isSingle ? '15px 30px' : '10px 20px'};
            font-weight: bold;
            font-size: ${isSingle ? '1.5rem' : '1rem'};
            cursor: pointer;
            border-radius: 6px;
        }

        button:hover {
            background-color: #ffb800;
        }
    </style>
    `;

    const saleText = product.sale ? `<div class="sale">${product.sale}</div>` : '';

    const template = `
    ${style}
    <div class="card">
        <div class="destination">${product.name}</div>
        <a href="ProductPage.html?id=${product.id}">
            <img src="${product.imgSrc}" alt="${product.name}">
        </a>
        <div class="separator"></div>
        <div class="info-section">
            <div class="price">${product.price}$</div>
            ${saleText}
        </div>
        <div class="button-section">
            <button class="add-to-cart">הוספה לסל</button>
        </div>
    </div>
    `;

    this.shadowRoot.innerHTML = template;

    this.shadowRoot.querySelector('.add-to-cart').addEventListener('click', () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            imgSrc: product.imgSrc,
            quantity: 1
        });
    });
}
}
customElements.define('product-card', ProductCard);

const productsContainer = document.getElementById('products-container');
const filterSelect = document.getElementById('destination-filter');

const displayProducts = (filteredProducts) => {
    productsContainer.innerHTML = ''; 
    filteredProducts.forEach(product => {
        const productElement = document.createElement('product-card');
        productElement.setAttribute('id', product.id);

        productsContainer.appendChild(productElement);
    });
};

const populateFilterOptions = () => {
    const destinations = [...new Set(products.map(product => product.name))]; 
    destinations.forEach(destination => {
        const option = document.createElement('option');
        option.value = destination;
        option.textContent = destination;
        filterSelect.appendChild(option);
    });
};

filterSelect.addEventListener('change', () => {
    
    const selectedDestination = filterSelect.value;
    if (selectedDestination === 'all') {
        displayProducts(products); 
    } else {
        const filteredProducts = products.filter(product => product.name === selectedDestination);
        displayProducts(filteredProducts); 
    }
});

populateFilterOptions();
displayProducts(products);
