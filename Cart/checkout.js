const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
const checkoutProductsList = document.getElementById('checkout-products__list');
const checkoutSummaryTotal = document.getElementById('checkout-summary__total');
const infoTab = document.getElementById('info-tab');
const paymentTab = document.getElementById('payment-tab');
const backBtn = document.getElementById('checkout-summary__back-btn');
const confirmBtn = document.getElementById('checkout-summary__confirm-btn');

localStorage.setItem('state','info');

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

function step(action = null){
    if(action === 'back'){
        localStorage.setItem('state', 'info');
        backBtn.classList.add('hidden');
        infoTab.classList.remove('hidden');
        paymentTab.classList.add('hidden');
        confirmBtn.innerText = 'Tiếp tục';
    }
    else{
        if (localStorage.getItem('state') === 'info') {
            localStorage.setItem('state', 'payment');
            infoTab.classList.add('hidden');
            paymentTab.classList.remove('hidden');
            backBtn.classList.remove('hidden');
            confirmBtn.innerText = 'Thanh toán';
        }else {
            localStorage.setItem('state', 'done');
            window.alert('Thanh toan thanh cong');
            window.location.href = 'cart.html';
            backBtn.classList.add('hidden');
            
       }
    }
    
}

let total = 0;
selectedProducts.forEach(product => {
    total += product.price * product.quantity;
});
checkoutSummaryTotal.innerText = `Tạm tính: ${total.toLocaleString()}₫`;
renderProducts();