const products = [
    { id: 1, name: "IPhone17ProMax", price: 36, quantity: 1, img_src: "phone_placeholder.jpg", checked: false },
    { id: 2, name: "IPhone17ProMax", price: 36, quantity: 1, img_src: "phone_placeholder.jpg", checked: false },
    { id: 3, name: "IPhone17ProMax", price: 36, quantity: 1, img_src: "phone_placeholder.jpg", checked: false },
    { id: 4, name: "IPhone17ProMax", price: 36, quantity: 1, img_src: "phone_placeholder.jpg", checked: false }
];

let cart =[];
// lấy thể hiện từ html cho dễ dùng
const productList = document.getElementById('product-list');
const cartTotal = document.getElementById('cart-summary__total');
const checkoutBtn = document.getElementById('cart-summary__checkout-btn');
const cartSummary = document.getElementById('cart-summary');

function renderProducts(){
	productList.innerHTML = ''
	if (products.length === 0){
		productList.innerHTML = `
			<h1 style ="text-align: center;"> Giở hàng của bạn đang trống</h1>
		`
		cartSummary.style.display = 'none';
	}
	else{
		cartSummary.style.display = 'flex';
		products.forEach((product,index) =>{
			const productDiv = document.createElement('div');
			productDiv.className= 'products-section__list-items';
			productDiv.innerHTML = `
				<div class="cart-item">
			        <div class="cart-item__checkbox-wrap">
			            <input type="checkbox" class="cart-item__checkbox">
			        </div>
			        <div class="cart-item__img-wrap">
			            <img src=${product.img_src} alt=${product.name} class="cart-item__img">
			        </div>

			        <div class="cart-item__info">
			            <div class="cart-item__header">
			                <h3 class="cart-item__name">${product.name}</h3>
			                <button class="cart-item__delete-btn" aria-label="Xóa">
			                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
			                </button>
			            </div>

			            <div class="cart-item__price-row">
			                <div class="cart-item__prices">
			                    <span class="cart-item__price-current">${product.price}₫</span>
			                    <span class="cart-item__price-old">${product.price}₫</span>
			                </div>
			                
			                <div class="cart-item__quantity">
			                    <button class="cart-item__qty-btn btn-decrease">-</button>
			                    <input type="text" class="cart-item__qty-input" value="1" readonly>
			                    <button class="cart-item__qty-btn btn-increase">+</button>
			                </div>
			            </div>
				       </div>
				</div>
			`;
			const checkbox = productDiv.querySelector('.cart-item__checkbox');
			const qtyInput = productDiv.querySelector('.cart-item__qty-input');
			const btnIncrease = productDiv.querySelector('.btn-increase');
			const btnDecrease = productDiv.querySelector('.btn-decrease');
			const btnDelete = productDiv.querySelector('.cart-item__delete-btn');
			checkbox.addEventListener('change', function(event){
				product.checked = event.target.checked;
				updateCartUI();
			});
			btnIncrease.addEventListener('click', function(){
				product.quantity+=1;
				qtyInput.value = product.quantity;
				updateCartUI();
			});
			btnDecrease.addEventListener('click', function(){
				if (product.quantity>1){
					product.quantity -= 1;
					qtyInput.value = product.quantity;
					updateCartUI();
				}
				
			});
			btnDelete.addEventListener('click', function(){
				products.splice(index, 1);
				renderProducts();
				updateCartUI();
			});

			productList.appendChild(productDiv);		
		});
	}
	
}

function updateCartUI() {
    let totalAmount = 0;
    products.forEach(product => {
        if (product.checked) {
            totalAmount += product.price * product.quantity;
        }
    });

    if (totalAmount === 0) {
        checkoutBtn.disabled = true;
        cartTotal.innerText = "Tạm tính: 0đ";
    } else {
        checkoutBtn.disabled = false;
        cartTotal.innerText = `Tạm tính: ${totalAmount}đ`;
    }
}

renderProducts()
updateCartUI()
