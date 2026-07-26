const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".thumbnail-list img");

thumbnails.forEach(img => {
    img.addEventListener("click", function () {

        mainImage.src = this.src;

        thumbnails.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");
    });
});


const storageButtons = document.querySelectorAll(".storage");
const productPrice = document.getElementById("productPrice");

storageButtons.forEach(button => {
    button.addEventListener("click", function () {

        storageButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        const price = Number(this.dataset.price);

        productPrice.textContent =
            price.toLocaleString("vi-VN") + " VNĐ";
    });
});


const colorButtons = document.querySelectorAll(".color");

colorButtons.forEach(button => {
    button.addEventListener("click", function () {

        colorButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");
    });
});

const productContainerEl = document.getElementsByClassName('product-detail')[0];

//Bắt sự kiện click vào nút thêm vào giỏ hàng để lấy thông tin và thêm nó vào localStorage
productContainerEl.addEventListener('click', function(e){
    //Ấn nút mua ngay
    if (e.target.id == "buyNow"){
        if (JSON.parse(localStorage.getItem('isLogin'))!=null){
            let productImage = productContainerEl.querySelector('#mainImage').src;
            let productName = productContainerEl.querySelector('#productName').innerText;
            let productQuantity =1;
            let productPrice = productContainerEl.querySelector('#productPrice').innerText;
            productPrice = parseInt(productPrice.replace(/\D/g, ""), 10);
            let newProduct = [{
                name: productName,
                image: productImage,
                quantity: productQuantity,
                price: productPrice,
                checked: true 
            }];
            localStorage.setItem('selectedProducts', JSON.stringify(newProduct));
            window.location.href = "../Cart/checkout.html";
        }else{
            window.alert('Bạn chưa đăng nhập. Hãy đăng nhập để sử dụng chức năng này');
            window.location.href = "../Auth/Li.html";
        }
    }
    //Ấn nút thêm vào giỏ hàng
    else if (e.target.id == "addCart"){
        if (JSON.parse(localStorage.getItem('isLogin'))!=null){
            let productImage = productContainerEl.querySelector('#mainImage').src;
            let productName = productContainerEl.querySelector('#productName').innerText;
            let productQuantity =1;
            let productPrice = productContainerEl.querySelector('#productPrice').innerText;
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
            window.location.href = "../Auth/Li.html";
        }
    }
});

