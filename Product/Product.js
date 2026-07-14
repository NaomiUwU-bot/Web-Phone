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