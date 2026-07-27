function initMenu(){

    const menuToggle=document.querySelector(".menu-toggle");
    const navbar=document.querySelector(".navbar");

    menuToggle.addEventListener("click",function(){

        navbar.classList.toggle("active");

    });

}


function showCurrentUser(){

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const logoutItem = document.getElementById("logout-item");
    const loginItem = document.getElementById("login-item");
    const userItem = document.getElementById("user-item");
    const userName = document.getElementById("user-name");

    if(currentUser){

        loginItem.style.display = "none";
        userItem.style.display = "block";
        logoutItem.style.display = "block";

        userName.textContent = currentUser.fullname;

    }else{

        loginItem.style.display = "block";
        userItem.style.display = "none";
        logoutItem.style.display = "none";
    }

}

function logout(){

    localStorage.removeItem("isLogin");
    localStorage.removeItem('state');
    localStorage.removeItem('selectedProducts');
    localStorage.removeItem("currentUser");

    location.reload();

}

function initLogout(){

    const logoutBtn = document.getElementById("logout-btn");

    if(logoutBtn){

        logoutBtn.addEventListener("click", function(event){

            event.preventDefault();

            logout();

        });

    }

}

function updateCartCount() {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    if (!currentUser || !currentUser.inCartProducts) {
        cartCount.textContent = 0;
        return;
    }

    let total = 0;

    currentUser.inCartProducts.forEach(function(product) {
        total += product.quantity;
    });

    cartCount.textContent = total;
}

window.addEventListener("DOMContentLoaded", function(){

    initMenu();

    updateCartCount();

    showCurrentUser();

    initLogout();

});

