
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', () => {
    const productId = getQueryParam('id');
    
    const container = document.getElementById('product-container');

    if (!productId) {
        container.innerText = 'לא נבחר מוצר להצגה.';
        return;
    }

    const productCard = document.createElement('product-card');
    productCard.setAttribute('id', productId);

    productCard.setAttribute('mode', 'single');

    container.appendChild(productCard);
});