const products = JSON.parse(localStorage.getItem('inCartProducts')) || [];

// Lưu lại trạng thái của giỏ hàng trong local storage mỗi khi thực hiện thay đổi (tăng, giảm, xóa) 
function saveCart(){
	localStorage.setItem('inCartProducts', JSON.stringify(products))
}

let cart =[];
// lấy thể hiện từ html cho dễ dùng
const productListEl = document.getElementById('product-list');
const cartTotalEl = document.getElementById('cart-summary__total');
const checkoutBtnEl = document.getElementById('cart-summary__checkout-btn');
const cartSummaryEl = document.getElementById('cart-summary');

const selectAllCheckboxEl = document.getElementById('select-all-checkbox');
const deleteAllBtnEl = document.getElementById('delete-all-btn');
const cartActionsEl = document.getElementById('cart-actions');
const btnIncrease = document.getElementsByClassName('btn-increase');
const btnDecrease = document.getElementsByClassName('btn-deacrease');


//Hiển thị các sản phẩm trong giỏ hàng và định nghĩa các hàm (tăng, giảm, xóa, check)
function renderProducts(){
	productListEl.innerHTML = ''
	if (products.length === 0){
		productListEl.innerHTML = `
			<h1 style ="text-align: center;"> Giỏ hàng của bạn đang trống</h1>
		`
		cartSummaryEl.style.display = 'none';
		cartActionsEl.style.display = 'none';
	}
	else{
		cartSummaryEl.style.display = 'flex';
		// products.forEach((product,index) =>{
		// 	const productDiv = document.createElement('div');
		// 	productDiv.innerHTML = `
		// 		<div class="cart-item">
		// 	        <div class="cart-item__checkbox-wrap">
		// 	            <input type="checkbox" class="cart-item__checkbox" ${product.checked ? 'checked' : ''}>
		// 	        </div>
		// 	        <div class="cart-item__img-wrap">
		// 	            <img src=${product.image} alt=${product.name} class="cart-item__img">
		// 	        </div>

		// 	        <div class="cart-item__info">
		// 	            <div class="cart-item__header">
		// 	                <h3 class="cart-item__name">${product.name}</h3>
		// 	                <button class="cart-item__delete-btn" aria-label="Xóa">
		// 	                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
		// 	                </button>
		// 	            </div>

		// 	            <div class="cart-item__price-row">
		// 	                <div class="cart-item__prices">
		// 	                    <span class="cart-item__price-current">${product.price}₫</span>
		// 	                    <span class="cart-item__price-old">${product.price}₫</span>
		// 	                </div>
			                
		// 	                <div class="cart-item__quantity">
		// 	                    <button class="cart-item__qty-btn btn-decrease">-</button>
		// 	                    <input type="text" class="cart-item__qty-input" value="${product.quantity}" readonly>
		// 	                    <button class="cart-item__qty-btn btn-increase">+</button>
		// 	                </div>
		// 	            </div>
		// 		       </div>
		// 		</div>
		// 	`;
		products.forEach((product, index)=>{
			const productDiv = document.createElement('div');
			productDiv.classList.add('cart-item');
			productDiv.innerHTML =`
				<input type="checkbox" name="select-item" class="cart-item__checkbox" ${product.checked ? 'checked' : ''}>
				<img src="${product.image}" class="cart-item__img">
				<div class="cart-item__name">${product.name}</div>
				<div class="cart-item__price">${product.price}đ</div>
				<div class="cart-item__quantity">
					<button class="cart-item__qty-btn btn-decrease">-</button>
					<input type="number" value="${product.quantity}" min="1" class="cart-item__qty-input" readonly>
					<button class="cart-item__qty-btn btn-increase">+</button>
			    </div>
			    <button class="cart-item__delete-btn">Xóa</button>
			`;

			
			const checkbox = productDiv.querySelector('.cart-item__checkbox');
			const qtyInput = productDiv.querySelector('.cart-item__qty-input');
			const btnIncrease = productDiv.querySelector('.btn-increase');
			const btnDecrease = productDiv.querySelector('.btn-decrease');
			const btnDelete = productDiv.querySelector('.cart-item__delete-btn');

			//Chọn sản phẩm để đi đến thanh toán
			checkbox.addEventListener('change', function(event){
				product.checked = event.target.checked;
				saveCart();
				updateCartUI();
			});

			//Tăng số lượng sản phẩm
			btnIncrease.addEventListener('click', function(){
				product.quantity+=1;
				qtyInput.value = product.quantity;
				saveCart();
				updateCartUI();
			});

			//Giảm số lượng sản phẩm
			btnDecrease.addEventListener('click', function(){
				if (product.quantity>1){
					product.quantity -= 1;
					qtyInput.value = product.quantity;

					saveCart();
					updateCartUI();
				}
				
			});

			//Xóa sản phẩm khỏi giỏ hàng
			btnDelete.addEventListener('click', function(){
				products.splice(index, 1);
				saveCart();
				renderProducts();
				updateCartUI();
			});

			productListEl.appendChild(productDiv);		
		});
	}
	
}

//Nút xóa tất cả
deleteAllBtnEl.addEventListener('click', function(){
	products.length=0;
	saveCart();
	renderProducts();
	updateCartUI();
});

//Bắt sự kiện của nút chọn tất cả
selectAllCheckboxEl.addEventListener('change', function(event) {
    const isChecked = event.target.checked;
    // Cập nhật trạng thái checked cho tất cả sản phẩm trong mảng
    products.forEach(product => {
        product.checked = isChecked;
    });
    saveCart();
    // Render lại giao diện để các checkbox con cập nhật theo
    renderProducts();
    updateCartUI();
});

function toVND(price){
	
}

//Chuyển đến trang thanh toán
function checkout(){
	const selectedProducts = products.filter(product => product.checked);
	localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts))
	localStorage.setItem('state', 'info');
	window.location.href = 'checkout.html';
}
checkoutBtnEl.addEventListener('click', checkout);

//Cập nhật lại trang sau khi thực hiện thay đổi
function updateCartUI() {
	selectAllCheckboxEl.checked = products.length > 0 && products.every(p => p.checked);

    let totalAmount = 0;
    products.forEach(product => {

        if (product.checked) {
            totalAmount += product.price * product.quantity;
        }
    });

    if (totalAmount === 0) {
        checkoutBtnEl.disabled = true;
        cartTotalEl.innerText = "Tạm tính: 0đ";
    } else {
        checkoutBtnEl.disabled = false;
        cartTotalEl.innerText = `Tạm tính: ${totalAmount}đ`;
    }
}


renderProducts()
updateCartUI()

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