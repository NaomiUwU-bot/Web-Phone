const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
const checkoutProductsListEl = document.getElementById('checkout-products__list');
const checkoutSummaryTotalEl = document.getElementById('checkout-summary__total');
const infoTabEl = document.getElementById('info-tab');
const paymentTabEl = document.getElementById('payment-tab');
const backBtnEl = document.getElementById('checkout-summary__back-btn');
const confirmBtnEl = document.getElementById('checkout-summary__confirm-btn');



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
        checkoutProductsListEl.appendChild(productDiv);		
    });
}

const paymentRadioEls = document.querySelectorAll('input[name="payment-method"]');
const qrCodeContainer = document.getElementById('qr-code-container');
paymentRadioEls.forEach(radio=>{
    radio.addEventListener('change', function(e){
        if (e.target.value === 'qr' && e.target.checked) {
            qrCodeContainer.classList.remove('hidden');
        } else {
            qrCodeContainer.classList.add('hidden');
        }
    });
});



backBtnEl.addEventListener('click', function(){
    localStorage.setItem('state', 'info');
    backBtnEl.classList.add('hidden');
    infoTabEl.classList.remove('hidden');
    paymentTabEl.classList.add('hidden');
    confirmBtnEl.innerText = 'Tiếp tục';
});

confirmBtnEl.addEventListener('click', function(){
    if (localStorage.getItem('state') === 'info') {
        localStorage.setItem('state', 'payment');
        infoTabEl.classList.add('hidden');
        paymentTabEl.classList.remove('hidden');
        backBtnEl.classList.remove('hidden');
        confirmBtnEl.innerText = 'Thanh toán';
    }else{
        localStorage.setItem('state', 'done');
        window.alert('Thanh toan thanh cong');
        window.location.href = 'cart.html';
        backBtnEl.classList.add('hidden');
    }
});


let total = 0;
selectedProducts.forEach(product => {
    total += product.price * product.quantity;
});
checkoutSummaryTotalEl.innerText = `Tạm tính: ${total.toLocaleString()}₫`;
renderProducts();

// Them Header va Footer
fetch("../Components/Header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header").innerHTML = data;
    });

fetch("../Components/Footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });