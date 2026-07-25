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
filterProducts();//gọi hàm