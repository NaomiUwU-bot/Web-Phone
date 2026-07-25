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


function filterProducts() {
    // Lấy tất cả danh sách hãng
    const menuItems = document.querySelectorAll(".category-menu a");

    // Lấy tất cả sản phẩm
    const products = document.querySelectorAll(".product");
    // duyệt từng danh sách
    menuItems.forEach(function (item) {
        // thêm sự kiện click
        item.addEventListener("click", function (e) {
            // ngăn chuyển trang
            e.preventDefault();
            // đi qua toàn bộ ds
            menuItems.forEach(function (link) {
                //xoá active cũ
                link.classList.remove("active");
            });
            //thêm active mới
            this.classList.add("active");

            // Lấy hãng được chọn
            const brand = this.dataset.brand;

            // Duyệt từng sản phẩm
            products.forEach(function (product) {
                // nếu chọn Tất cả
                if (brand === "all") {
                    // hiển thị kq sản phẩm
                    product.style.display = "flex";
                }
                
                else if (product.dataset.brand === brand) {
                    //hiện sp-đúng hãng chọn
                    product.style.display = "flex";
                }
                else {
                    // ẩn sp-sai hãng chọn
                    product.style.display = "none";
                }
            });
        });

    });
}
<<<<<<< HEAD
filterProducts();//gọi hàm
=======
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
>>>>>>> ec9d77de38991d46c124bf6efe7d622e4d6a8f21
