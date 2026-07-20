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
	
		products.forEach((product, index)=>{
			const productDiv = document.createElement('div');
			productDiv.classList.add('cart-item');

			const checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			checkbox.name = 'select-item';
			checkbox.className = 'cart-item__checkbox';
			checkbox.checked = product.checked; 

			const img = document.createElement('img');
			img.src = product.image;
			img.className = 'cart-item__img';

			const nameDiv = document.createElement('div');
			nameDiv.className = 'cart-item__name';
			nameDiv.textContent = product.name;

			const priceDiv = document.createElement('div');
			priceDiv.className = 'cart-item__price';
			priceDiv.textContent = `${product.price.toLocaleString()}đ`;

			const quantityDiv = document.createElement('div');
			quantityDiv.className = 'cart-item__quantity';

			const btnDecrease = document.createElement('button');
			btnDecrease.className = 'cart-item__qty-btn btn-decrease';
			btnDecrease.textContent = '-';

			const qtyInput = document.createElement('input');
			qtyInput.type = 'number';
			qtyInput.value = product.quantity;
			qtyInput.min = '1';
			qtyInput.className = 'cart-item__qty-input';
			qtyInput.readOnly = true;

			const btnIncrease = document.createElement('button');
			btnIncrease.className = 'cart-item__qty-btn btn-increase';
			btnIncrease.textContent = '+';

			quantityDiv.appendChild(btnDecrease);
			quantityDiv.appendChild(qtyInput);
			quantityDiv.appendChild(btnIncrease);

			const deleteBtn = document.createElement('button');
			deleteBtn.className = 'cart-item__delete-btn';
			deleteBtn.textContent = 'Xóa';

			productDiv.appendChild(checkbox);
			productDiv.appendChild(img);
			productDiv.appendChild(nameDiv);
			productDiv.appendChild(priceDiv);
			productDiv.appendChild(quantityDiv);
			productDiv.appendChild(deleteBtn);

			const checkBoxEl = productDiv.querySelector('.cart-item__checkbox');
			const qtyInputEl = productDiv.querySelector('.cart-item__qty-input');
			const btnIncreaseEl = productDiv.querySelector('.btn-increase');
			const btnDecreaseEl = productDiv.querySelector('.btn-decrease');
			const btnDeleteEl = productDiv.querySelector('.cart-item__delete-btn');

			//Chọn sản phẩm để đi đến thanh toán
			checkBoxEl.addEventListener('change', function(event){
				product.checked = event.target.checked;
				saveCart();
				updateCartUI();
			});

			//Tăng số lượng sản phẩm
			btnIncreaseEl.addEventListener('click', function(){
				product.quantity+=1;
				qtyInput.value = product.quantity;
				saveCart();
				updateCartUI();
			});

			//Giảm số lượng sản phẩm
			btnDecreaseEl.addEventListener('click', function(){
				if (product.quantity>1){
					product.quantity -= 1;
					qtyInput.value = product.quantity;

					saveCart();
					updateCartUI();
				}
				
			});

			//Xóa sản phẩm khỏi giỏ hàng
			btnDeleteEl.addEventListener('click', function(){
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
    products.forEach(product => {
        product.checked = isChecked;
    });

    saveCart();
    renderProducts();
    updateCartUI();
});

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
	selectAllCheckboxEl.checked = products.every(p => p.checked);
 
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
        cartTotalEl.innerText = `Tạm tính: ${totalAmount.toLocaleString()}đ`;
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