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


// ===============================
// Hàm hiển thị sản phẩm
// ===============================
// Lấy thẻ HTML chứa danh sách sản phẩm
const productContainer = document.getElementById("productContainer");
function renderProducts(productList) {
    // Xóa dữ liệu cũ
    productContainer.innerHTML = "";
    // Duyệt từng sản phẩm
    productList.forEach(function (product) {
        productContainer.innerHTML += `
            <div class="product">
                <div class="product-image">
                    <a href="../Product-detail/Product-detail.html?id=${product.id}">
                        <img src="../${product.image}" alt="${product.name}">
                    </a>
                </div>

                <div class="product-rating">
                    <i class="fa-solid fa-star" style="color: gold;"></i>
                    <span>${product.rating}</span>

                    <span class="sold">Đã bán ${product.sold}</span>
                </div>

                <div class="product-info">

                    <h5>${product.name}</h5>

                    <div class="specs">
                        <span>${product.ram}</span>
                        <span>${product.storage}</span>
                        <span>${product.cpu}</span>
                    </div>

                    <p class="price">
                        ${product.price.toLocaleString()} VNĐ
                    </p>

                </div>

                <div class="product-action">

                    <button class="buy-btn">
                        Mua ngay
                    </button>

                    <a href="../Product-detail/Product-detail.html?id=${product.id}" class="detail-link">
                        Xem chi tiết
                    </a>

                </div>

            </div>
        `;

    });

}
// Hiển thị tất cả sản phẩm khi mở trang
renderProducts(products);

// ===============================
// Lọc sản phẩm theo hãng
// ===============================

function filterProducts() {

    const brandLinks = document.querySelectorAll(".category-menu a");

    brandLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            const brand = this.dataset.brand;

            if (brand === "all") {
                renderProducts(products);
                return;
            }

            const result = products.filter(function (product) {
                return product.brand === brand;
            });

            renderProducts(result);

        });

    });

}
// Kích hoạt chức năng lọc
filterProducts();