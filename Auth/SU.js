///LẤY CÁC PHẦN TỬ TỪ HTML///

// Lấy thẻ form
const form = document.querySelector("form");

// Lấy các ô nhập
const fullname = document.querySelector("input[name='fullname']");
const ngaysinh = document.querySelector("input[name='ngaysinh']");
const email = document.querySelector("input[name='email']");
const phone = document.querySelector("input[name='phone']");
const password = document.querySelector("input[name='password']");
const confirm_password = document.querySelector("input[name='confirm_password']");

// Lấy icon hiện/ẩn mật khẩu
const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

// Checkbox điều khoản
const agree = document.querySelector("input[name='agree']");

// Lấy tất cả ô báo lỗi
const errors = document.querySelectorAll(".error");



///=====================================///
/// HÀM DÙNG TRONG SIGN UP
///=====================================///

// Kiểm tra Email
function validateEmail(email){
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.trim());
}

// Kiểm tra số điện thoại
function validatePhone(phone){
    let phonePattern = /^0\d{9}$/;
    return phonePattern.test(phone.trim());
}

// Kiểm tra mật khẩu
function validatePassword(password){
    return password.trim().length >= 6;
}

// Kiểm tra nhập lại mật khẩu
function validateConfirmPassword(password, confirmPassword){
    return password === confirmPassword;
}

//Lưu tài khoản
function saveUser(){
    const user = {
        fullname: fullname.value,
        birthday: ngaysinh.value,
        email: email.value,
        phone: phone.value,
        password: password.value
    };
    localStorage.setItem("user", JSON.stringify(user));
}


// Hiện / Ẩn mật khẩu
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



// Hiện / Ẩn nhập lại mật khẩu
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



///=====================================///
/// HÀM SIGN UP
///=====================================///

function signup(){

    form.addEventListener("submit", function(event){

        event.preventDefault();

        // Xóa lỗi cũ
        errors.forEach(function(item){
            item.textContent = "";
        });

        let isValid = true;


        /// HỌ VÀ TÊN
        if(fullname.value.trim() === ""){
            errors[0].textContent = "Vui lòng nhập họ và tên.";
            isValid = false;
        }


        /// NGÀY SINH
        if(ngaysinh.value === ""){
            errors[1].textContent = "Vui lòng chọn ngày sinh.";
            isValid = false;
        }


        /// EMAIL
        if(email.value.trim() === ""){
            errors[2].textContent = "Vui lòng nhập Email.";
            isValid = false;
        }
        else if(!validateEmail(email.value)){
            errors[2].textContent = "Email không đúng định dạng.";
            isValid = false;
        }


        /// SỐ ĐIỆN THOẠI
        if(phone.value.trim() === ""){
            errors[3].textContent = "Vui lòng nhập số điện thoại.";
            isValid = false;
        }
        else if(!validatePhone(phone.value)){
            errors[3].textContent = "Số điện thoại phải gồm đúng 10 số.";
            isValid = false;
        }


        /// MẬT KHẨU
        if(password.value.trim() === ""){
            errors[4].textContent = "Vui lòng nhập mật khẩu.";
            isValid = false;
        }
        else if(!validatePassword(password.value)){
            errors[4].textContent = "Mật khẩu phải có ít nhất 6 ký tự.";
            isValid = false;
        }


        /// NHẬP LẠI MẬT KHẨU
        if(confirm_password.value.trim() === ""){
            errors[5].textContent = "Vui lòng nhập lại mật khẩu.";
            isValid = false;
        }
        else if(!validateConfirmPassword(password.value, confirm_password.value)){
            errors[5].textContent = "Mật khẩu xác nhận không khớp.";
            isValid = false;
        }


        /// ĐIỀU KHOẢN
        if(!agree.checked){
            alert("Bạn phải đồng ý với điều khoản.");
            isValid = false;
        }


        ///THÀNH CÔNG///
        if(isValid){
            const user = {
                fullname: fullname.value.trim(),
                ngaysinh: ngaysinh.value,
                phone: phone.value.trim(),
                email: email.value.trim(),
                password: password.value
            };
            saveUser(user);
            alert("Đăng ký thành công!");
            form.reset();
        }
    });   
}
///=====================================///
/// CHẠY CHƯƠNG TRÌNH
///=====================================///

signup();