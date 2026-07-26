// Lọc sản phẩm theo thương hiệu
const tabs = document.querySelectorAll('#filterTabs button');
const cards = document.querySelectorAll('#productGrid .product-card');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    cards.forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.brand === filter) ? 'flex' : 'none';
    });
  });
});

// Toggle yêu thích
document.querySelectorAll('.wish-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
  });
});


const productContainerEl = document.getElementsByClassName('product-section')[0];
//Bắt sự kiện click vào nút thêm vào giỏ hàng để lấy id và thêm nó vào local storage
productContainerEl.addEventListener('click', function(e){
  if (e.target.classList.contains('buy-btn')){
    if(isLogin()){
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
