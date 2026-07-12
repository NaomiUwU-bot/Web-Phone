const productContainer = document.getElementById("productContainer"); 
function renderProducts() {
    productContainer.innerHTML = "";
    //duyệt từng sản phẩm trong mảng products
    products.forEach(function (product) {
        productContainer.innerHTML += `
            <div class="product">
                <div class="product-image">
                    <a href="Product-detail.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}">
                    </a>
                </div>

                <div class="product-rating">
                    <i class="fa-solid fa-star"></i>
                    <span>${product.rating}</span>

                    <span class="sold"> Đã bán ${product.sold}</span>
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
                    <button class="buy-btn" data-id="${product.id}">Mua ngay</button>
                    
                    <a href="Product-detail.html?id=${product.id}" class="detail-link">
                        Xem chi tiết
                    </a>
                </div>

            </div>
        `;

    });

}

renderProducts();

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