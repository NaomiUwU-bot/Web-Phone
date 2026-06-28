const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
const checkoutProductsList = document.getElementById('checkout-products__list');
const checkoutSummaryTotal = document.getElementById('checkout-summary__total');

function renderProducts(){
    selectedProducts.forEach((product,index) =>{
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <div class="cart-item">
                <div class="cart-item__img-wrap">
                    <img src=${product.img_src} alt=${product.name} class="cart-item__img">
                </div>

                <div class="cart-item__info">
                    <div class="cart-item__header">
                        <h3 class="cart-item__name">${product.name}</h3>
                    </div>

                    <div class="cart-item__price-row">
                        <div class="cart-item__prices">
                            <span class="cart-item__price-current">${product.price}₫</span>
                            <span class="cart-item__price-old">${product.price}₫</span>
                        </div>
                        
                        <div class="cart-item__quantity">
                            <span>${product.quantity}</span>
                        </div>
                    </div>
                    </div>
            </div>
        `;
        checkoutProductsList.appendChild(productDiv);		
    });
}

let total = 0;
selectedProducts.forEach(product => {
    total += product.price * product.quantity;
});
checkoutSummaryTotal.innerText = `Tạm tính: ${total.toLocaleString()}₫`;
renderProducts();