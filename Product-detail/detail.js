
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