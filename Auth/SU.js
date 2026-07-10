///LẤY CÁC PHÀN TỬ TRONG HTML///
const form = document.querySelector("form");
const fullname = document.querySelector("input[name='fullname']");
const username = document.querySelector("input[name='username']");
const email = document.querySelector("input[name='email']");
const phone = document.querySelector("input[name='phone']");
const password = document.querySelector("input[name='password']");
const confirm_password = document.querySelector("input[name='confirm_password']");
const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
const agree = document.querySelector("input[name='agree']");
const errors = document.querySelectorAll(".error");


///KIỂM TRA KHI NHẤN CÁC NÚT///
form.addEventListener("submit", function(event){
    event.preventDefault();
    //Xóa toàn bộ lỗi cũ
    errors.forEach(function(item){
        item.textContent = "";
    });
    let isValid = true;

    ///HỌ VÀ TÊN///
    if(fullname.value.trim() === ""){
        errors[0].textContent = "Vui lòng nhập họ và tên.";
        isValid = false
    }


    ///TÊN ĐĂNG NHẬP///
     if(username.value.trim() === ""){
        errors[1].textContent = "Vui lòng nhập tên đăng nhập.";
        isValid = false;
    }
    else if(username.value.length < 6){
        errors[1].textContent = "Tên đăng nhập phải từ 6 ký tự.";
        isValid = false;
    }


    ///EMAIL///
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.value.trim() === ""){
        errors[2].textContent = "Vui lòng nhập Email.";
        isValid = false;
    }
    else if(!emailPattern.test(email.value)){
        errors[2].textContent = "Email không đúng định dạng.";
        isValid = false;
    }


    ///SỐ ĐIỆN THOẠI///
    let phonePattern = /^[0-9]{10}$/;
    if(phone.value.trim() === ""){
        errors[3].textContent = "Vui lòng nhập số điện thoại.";
        isValid = false;
    }
    else if(!phonePattern.test(phone.value)){
        errors[3].textContent = "Số điện thoại phải gồm đúng 10 số.";
        isValid = false;
    }


    ///MẬT KHẨU///
    if(password.value.trim() === ""){
        errors[4].textContent = "Vui lòng nhập mật khẩu.";
        isValid = false;
    }
    else if(password.value.length < 6){
        errors[4].textContent = "Mật khẩu phải có ít nhất 6 ký tự.";
        isValid = false;
    }


    // /NHẬP LẠI MẬT KHẨU///
    if(confirm_password.value.trim() === ""){
        errors[5].textContent = "Vui lòng nhập lại mật khẩu.";
        isValid = false;
    }
    else if(confirm_password.value !== confirm_password.value){
        errors[5].textContent = "Mật khẩu xác nhận không khớp.";
        isValid = false;
    }


    ///ĐIỀU KHOẢN///
    if(!agree.checked){
        alert("Bạn phải đồng ý với điều khoản.");
        isValid = false;
    }


    ///THÀNH CÔNG///
    if(isValid){
        alert("Đăng ký thành công!");

    }
});

// Hiện mật khẩu
togglePassword.addEventListener("click", function(){
    if(password.type === "password"){
        password.type = "text";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");
    }else{
        password.type = "password";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");
    }
});

// Hiện nhập lại mật khẩu
toggleConfirmPassword.addEventListener("click", function(){
    if(confirm_password.type === "password"){
        confirm_password.type = "text";
        toggleConfirmPassword.classList.remove("fa-eye-slash");
        toggleConfirmPassword.classList.add("fa-eye");
    }else{
        confirm_password.type = "password";
        toggleConfirmPassword.classList.remove("fa-eye");
        toggleConfirmPassword.classList.add("fa-eye-slash");
    }
});

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