const productContainerEl = document.getElementsByClassName('product-section')[0];

//Bắt sự kiện click vào nút thêm vào giỏ hàng để lấy id và thêm nó vào local storage
productContainerEl.addEventListener('click', function(e){
	if (e.target.classList.contains('buy-btn')){
		const productEl = e.target.parentElement.parentElement;
		let productChilds = productEl.children;
		let productImage = productChilds[1].firstElementChild.src;
		let productName = productChilds[3].firstElementChild.innerText;
		let productQuantity =1;
		let productPrice = productChilds[3].lastElementChild.innerText;
		productPrice = parseInt(productPrice.replace(/\D/g, ""), 10);
		let newProduct = {
			name: productName,
			image: productImage,
			quantity: productQuantity,
			price: productPrice,
			checked: false 
		};
		addToCart(newProduct);
	}
});

//Thêm sản phẩm vào giỏ hàng với id tương ứng
function addToCart(newProduct){
	const inCartProducts = JSON.parse(localStorage.getItem('inCartProducts')) || [];
	let existIndex = inCartProducts.findIndex(product=> product.name === newProduct.name);
	if (newProduct){
		if (existIndex!==-1){ //Nếu đã tồn tại trong giỏ hàng, tăng số lượng lên 1
			inCartProducts[existIndex].quantity +=1;
			window.alert('Sản phẩm đã có sẵn trong giỏ hàng.\nTăng số lượng sản phẩm lên 1.');
		}else{
			window.alert('Đã thành công thêm vào giỏ hàng!');
			inCartProducts.push(newProduct);
		}
	}

	localStorage.setItem('inCartProducts', JSON.stringify(inCartProducts));
}