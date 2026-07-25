function initMenu(){

    const menuToggle=document.querySelector(".menu-toggle");
    const navbar=document.querySelector(".navbar");

    menuToggle.addEventListener("click",function(){

        navbar.classList.toggle("active");

    });

}

function updateHeader(){

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const loginLink = document.getElementById("login-link");
    const userBox = document.getElementById("user-box");
    const userName = document.getElementById("user-name");

    if(currentUser){

        loginLink.style.display = "none";

        userBox.style.display = "block";

        userName.textContent = currentUser.name;

    }else{

        loginLink.style.display = "block";

        userBox.style.display = "none";

    }

}