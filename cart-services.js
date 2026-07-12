const productContainerEl = document.getElementById('productContainer');

//Bắt sự kiện click vào nút thêm vào giỏ hàng để lấy id và thêm nó vào local storage
productContainerEl.addEventListener('click', function(e){
	if (e.target.classList.contains('buy-btn')){
		let productId = e.target.getAttribute ('data-id');
		addToCart(productId);
	}
});

//Thêm sản phẩm vào giỏ hàng với id tương ứng
function addToCart(id){
	const inCartProducts = JSON.parse(localStorage.getItem('inCartProducts')) || [];

	let newProduct = products.find(function(product){
		return id == Number(product.id);
	});
	let existIndex = inCartProducts.findIndex(product=> product.id === Number(id));

	if (newProduct){

		if (existIndex!==-1){ //Nếu đã tồn tại trong giỏ hàng, tăng số lượng lên 1
			inCartProducts[existIndex].quantity +=1;
			window.alert('Sản phẩm đã có sẵn trong giỏ hàng.\nTăng số lượng sản phẩm lên 1.');
		}else{
			window.alert('Đã thành công thêm vào giỏ hàng!');
			newProduct.quantity=1;
			newProduct.checked = false;
			inCartProducts.push(newProduct);
		}
	}

	localStorage.setItem('inCartProducts', JSON.stringify(inCartProducts));
}
