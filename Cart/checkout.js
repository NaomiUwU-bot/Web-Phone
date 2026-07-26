//Xác thực xem đã đăng nhập hay chưa
if (!isLogin()){
    window.alert('Bạn chưa đăng nhập. Hãy đăng nhập để sử dụng chức năng này');
    window.location.href = "../Auth/LI.html";
} else{
    const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
    const checkoutProductsListEl = document.getElementById('checkout-products__list');
    const infoTabEl = document.getElementById('info-tab');
    const paymentTabEl = document.getElementById('payment-tab');
    const backBtnEl = document.getElementById('checkout-summary__back-btn');
    const confirmBtnEl = document.getElementById('checkout-summary__confirm-btn');
    const storeSelectEl = document.getElementById('store-select');

    localStorage.setItem('state','info');

    //Hàm thực hiện render các sản phẩm đã được chọn trong giỏ hàng vào phần checkout
    function renderProducts(){
        selectedProducts.forEach((product,index) =>{
            const productDiv = document.createElement('div');
            productDiv.className ="cart-item";

            const img = document.createElement('img');
            img.src = product.image;
            img.className = 'cart-item__img';

            const nameDiv = document.createElement('div');
            nameDiv.className = 'cart-item__name';
            nameDiv.textContent = product.name;

            const quantityDiv = document.createElement('div');
            quantityDiv.className = 'cart-item__quantity';
            quantityDiv.textContent = `Số lượng: ${product.quantity}`;

            const priceDiv = document.createElement('div');
            priceDiv.className = 'cart-item__price';
            priceDiv.textContent =     `${product.price.toLocaleString()}₫`;

            const totalPriceDiv = document.createElement('div');
            totalPriceDiv.className = 'cart-item__total-price';
            totalPriceDiv.textContent = `Tổng: ${(product.quantity * product.price).toLocaleString()}₫`;

            productDiv.appendChild(img);
            productDiv.appendChild(nameDiv);
            productDiv.appendChild(quantityDiv);
            productDiv.appendChild(priceDiv);
            productDiv.appendChild(totalPriceDiv);
            


            checkoutProductsListEl.appendChild(productDiv);		
        });
    }

    //bắt sự kiện thay đổi phương thức thanh toán
    const paymentRadioEls = document.querySelectorAll('input[name="payment-method"]');
    const qrCodeContainerEl = document.getElementById('qr-code-container');
    const storesContainerEl = document.getElementById('store-select-container')
    let method ='at-store';
    paymentRadioEls.forEach(radio=>{
        radio.addEventListener('change', function(e){
            if (e.target.value === 'qr' && e.target.checked) {
                method = 'qr';
                qrCodeContainerEl.classList.remove('hidden');
                storesContainerEl.classList.add('hidden');
            } else {
                method = 'at-store';
                qrCodeContainerEl.classList.add('hidden');
                storesContainerEl.classList.remove('hidden');
            }
        });
    });

    //Nút quay về
    backBtnEl.addEventListener('click', function(){
        localStorage.setItem('state', 'info');
        backBtnEl.classList.add('hidden');
        infoTabEl.classList.remove('hidden');
        paymentTabEl.classList.add('hidden');
        confirmBtnEl.innerText = 'Tiếp tục';
    });

    //Nút tiếp tục
    confirmBtnEl.addEventListener('click', function(e){
        if (localStorage.getItem('state') === 'info') {
            const address = document.getElementById('customer-address').value.trim();
            if(address===""){
                e.preventDefault();
                const error = document.getElementsByClassName('error');
                error[0].innerText = "**Vui lòng nhập vào địa chỉ để tiếp tục**";
            }else{
                localStorage.setItem('state', 'payment');
                infoTabEl.classList.add('hidden');
                paymentTabEl.classList.remove('hidden');
                backBtnEl.classList.remove('hidden');
                confirmBtnEl.innerText = 'Mua ngay';
            }
            
        }else{
            if(storeSelectEl.value=="" && method == 'at-store'){
                window.alert('Vui lòng chọn cửa hàng nhận sản phẩm');
            }else{
                localStorage.setItem('state', 'done');
                localStorage.removeItem('selectedProducts');
                window.alert('Thanh toan thanh cong');
                window.location.href = 'cart.html';
                backBtnEl.classList.add('hidden');
            }
            
        }
    });

    //render phần summary của checkout, in ra tổng tiền phải trả (đã tính VAT 10%)
    let total = 0;
    selectedProducts.forEach(product => {
        total += product.price * product.quantity;
    });

    const checkoutSummaryEl = document.getElementById('checkout-summary');
    const checkoutSummaryTotalEl = document.createElement('span');
    checkoutSummaryTotalEl.id = 'checkout-summary__total';
    checkoutSummaryTotalEl.innerText = `Tổng tiền: ${Math.ceil(total * 1.1).toLocaleString()}₫`;
    const vatEl = document.createElement('span');
    vatEl.innerText = '(đã bao gồm VAT và làm tròn)';
    checkoutSummaryTotalEl.appendChild(vatEl);
    checkoutSummaryEl.prepend(checkoutSummaryTotalEl);

    renderProducts();
}

//Render phần thông tin người dùng (địa chỉ tự nhập)
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
document.getElementById('customer-name').value = currentUser.fullname;
document.getElementById('customer-phone').value = currentUser.phone;
document.getElementById('customer-email').value = currentUser.email;