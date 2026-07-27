//Xác thực xem đã đăng nhập hay chưa
if (JSON.parse(localStorage.getItem('isLogin'))==null){
	window.alert('Bạn chưa đăng nhập. Hãy đăng nhập để sử dụng chức năng này');
	window.location.href = "../Auth/Li.html";
}else{

	//Lấy danh sách các mặt hàng nằm trong giỏ (nếu có)
	const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
	const products = currentUser.inCartProducts || [];

	// Lưu lại trạng thái của giỏ hàng trong local storage mỗi khi thực hiện thay đổi (tăng, giảm, xóa) 
	function saveCart(){
		localStorage.setItem('currentUser', JSON.stringify(currentUser));
		const users = JSON.parse(localStorage.getItem('users')) || [];
		users[currentUser.id] = currentUser;
		localStorage.setItem('users', JSON.stringify(users));
		updateCartCount();
	}

	// lấy các element từ html về cho dễ dùng
	const productListEl = document.getElementById('product-list');
	const cartTotalEl = document.getElementById('cart-summary__total');
	const checkoutBtnEl = document.getElementById('cart-summary__checkout-btn');
	const cartSummaryEl = document.getElementById('cart-summary');

	const selectAllCheckboxEl = document.getElementById('select-all-checkbox');
	const deleteAllBtnEl = document.getElementById('delete-all-btn');
	const cartActionsEl = document.getElementById('cart-actions');
	const blankCartEl = document.getElementById('blank-cart');

	//Hiển thị các sản phẩm trong giỏ hàng và định nghĩa các hàm (tăng, giảm, xóa, check)
	function renderProducts(){
		if (products.length === 0){
			blankCartEl.innerText = "Giỏ hàng của bạn đang trống";
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
				priceDiv.textContent = `${product.price.toLocaleString()}₫`;

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
		localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
		localStorage.setItem('state', 'info');
		window.location.href = 'checkout.html';
	}
	checkoutBtnEl.addEventListener('click', checkout);

	//Cập nhật lại trang sau khi thực hiện thay đổi
	function updateCartUI() {
		//logic của nút chọn tất cả
		selectAllCheckboxEl.checked = products.every(p => p.checked);
	 
	    let totalAmount = 0;
	    products.forEach(product => {

	        if (product.checked) {
	            totalAmount += product.price * product.quantity;
	        }
	    });

	    if (totalAmount === 0) {
	        checkoutBtnEl.disabled = true;
	        cartTotalEl.innerText = "Tạm tính: 0₫";
	    } else {
	        checkoutBtnEl.disabled = false;
	        cartTotalEl.innerText = `Tạm tính: ${totalAmount.toLocaleString()}₫`;
	    }
	}
	renderProducts()
	updateCartUI()

}