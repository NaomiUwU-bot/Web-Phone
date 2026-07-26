
const productContainerEl = document.getElementsByClassName('product-section')[0];
//Bắt sự kiện click vào nút thêm vào giỏ hàng để lấy thông tin và thêm nó vào localStorage
productContainerEl.addEventListener('click', function(e){
  if (e.target.classList.contains('buy-btn')){
    if(JSON.parse(localStorage.getItem('isLogin'))!=null){
      const productEl = e.target.parentElement.parentElement;
      let productImage = productEl.querySelector('img').src;
      let productName = productEl.querySelector('h5').innerText;
      let productQuantity =1;
      let productPrice = productEl.querySelector('.price').innerText;
      productPrice = parseInt(productPrice.replace(/\D/g, ""), 10);
      let newProduct = {
        name: productName,
        image: productImage,
        quantity: productQuantity,
        price: productPrice,
        checked: false 
      };
      addToCart(newProduct);
    }else{
      window.alert('Bạn chưa đăng nhập. Hãy đăng nhập để sử dụng chức năng này');
      window.location.href = "../Auth/LI.html";
    }
  }
});

