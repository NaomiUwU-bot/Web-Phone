// Them Header va Footer

fetch("../Components/Footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });

function filterProducts() {
    // Lấy tất cả menu hãng
    const menuItems = document.querySelectorAll(".category-menu a");

    // Lấy tất cả sản phẩm
    const products = document.querySelectorAll(".product");
    menuItems.forEach(function (item) {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            menuItems.forEach(function (link) {
                link.classList.remove("active");
            });
            this.classList.add("active");

            // Lấy hãng được chọn
            const brand = this.dataset.brand;

            // Duyệt từng sản phẩm
            products.forEach(function (product) {
                if (brand === "all") {
                    product.style.display = "flex";
                }
                else if (product.dataset.brand === brand) {
                    product.style.display = "flex";
                }
                else {
                    product.style.display = "none";
                }
            });
        });

    });
}
filterProducts();

const productContainerEl = document.getElementsByClassName('product-section')[0];

//Bắt sự kiện click vào nút thêm vào giỏ hàng để lấy id và thêm nó vào local storage
productContainerEl.addEventListener('click', function(e){
    if (e.target.classList.contains('buy-btn')){
        if (isLogin()){
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
        else{
            window.alert('Bạn chưa đăng nhập. Hãy đăng nhập để sử dụng chức năng này');
            window.location.href = "../Auth/Li.html";
        }
    }
});
