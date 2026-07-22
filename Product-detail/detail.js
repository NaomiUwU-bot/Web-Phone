
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

//Bắt sự kiện click vào nút thêm vào giỏ hàng để lấy id và thêm nó vào local storage
productContainerEl.addEventListener('click', function(e){
    if (e.target.id == "addCart"){
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
    }
});

//Thêm sản phẩm vào giỏ hàng với id tương ứng
function addToCart(newProduct){
    const inCartProducts = JSON.parse(localStorage.getItem('inCartProducts')) || [];
    let existIndex = inCartProducts.findIndex(product=> product.name === newProduct.name);
    if (newProduct){
        if (existIndex!==-1){ //Nếu đã tồn tại trong giỏ hàng, tăng số lượng lên 1
            inCartProducts[existIndex].quantity +=1;
            window.alert('Sản phẩm đã có sẵn trong giỏ hàng.\nTăng số lượng sản phẩm lên 1.');
        }else{
            window.alert('Đã thành công thêm vào giỏ hàng!');
            inCartProducts.push(newProduct);
        }
    }

    localStorage.setItem('inCartProducts', JSON.stringify(inCartProducts));
}



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