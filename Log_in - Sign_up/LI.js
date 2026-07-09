///lẤY CÁC PHẦN TỬ TỪ HTML///
//Lấy thẻ form
const form  = document.querySelector("form");
//Lấy ô nhập tên đăng nhập
const username = document.querySelector("input[name='username']");
//Lấy ô nhập mật khẩu
const password = document.querySelector("input[name='password']");
const togglePassword = document.getElementById("togglePassword");
//Lấy tất cả thẻ hiện thị lỗi
const errors = document.querySelectorAll(".error");

///KIỂM TRA KHI NHẤN NÚT///
form.addEventListener("submit", function(event){
    //Không cho form gửi ngay
    event.preventDefault();
    //Xóa thông báo lỗi cũ
    errors.forEach(function(item){
        item.textContent = "";
    });
    //Biến kiểm tra dữ liệu
    let isValid = true;


    ///KIỂM TRA TÊN ĐĂNG NHẬP///
    if(username.value.trim() === ""){
        errors[0].textContent = "Vui lòng nhập tên đăng nhập hoặc Email.";
        isValid = false;
    }


    ///KIỂM TRA MẬT KHẨU///
    if(password.value.trim() === ""){
        errors[1].textContent = "Vui lòng nhập mật khẩu.";
        isValid = false
    }
    else if(password.value.length < 6){
        errors[1].textContent = "Mật khẩu phải có ít nhất 6 ký tự.";
        isValid = false;
    } 


    ///NẾU HỢP LỆ///
    if(isValid){
        alert("Đăng nhập thành công.");
        form.submit();
    }
});

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