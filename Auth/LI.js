///LẤY CÁC PHẦN TỬ TỪ HTML///
    //Lấy thẻ form
    const form  = document.querySelector("form");
    //Lấy ô nhập sdt
    const tel = document.querySelector("input[name='sdt']");
    //Lấy ô nhập mật khẩu
    const password = document.querySelector("input[name='password']");
    //Lấy con mắt ẩn hiện mật khẩu
    const togglePassword = document.getElementById("togglePassword");
    //Lấy tất cả thẻ hiện thị lỗi
    const errors = document.querySelectorAll(".error");



///HÀM DÙNG TRONG LOGIN///
    //HÀM KIỂM TRA SĐT//
    function validatePhone(tel){
    let telPattern = /^0\d{9}$/;
    return telPattern.test(tel.trim());
    }
    
    //HÀM KIỂM TRA MẬT KHẨU//
    function validatePassword(password){
    return password.trim().length >= 6;
    }

    ///HÀM ẨN HIỆN MẬT KHẨU///    
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

    ///HÀM GHI NHỚ ĐĂNG NHẬP///
    function rememberMe(){
        const remember = document.querySelector("input[name='remember']");
        if(remember.checked){
            localStorage.setItem("rememberPhone", tel.value);
        }
        else{
            localStorage.removeItem("rememberPhone");
        }
    }

    ///HÀM TỰ ĐỘNG HIỂN THỊ SỐ ĐIỆN THOẠI ĐÃ GHI NHỚ///
    window.addEventListener("load", function(){
        let savedPhone = localStorage.getItem("rememberPhone");
        if(savedPhone){
            tel.value = savedPhone;
            document.querySelector("input[name='remember']").checked = true;
        }
    });



///HÀM LOGIN///
function login(){
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


    ///KIỂM TRA SỐ ĐIỆN THOẠI///
        if(tel.value.trim() === ""){
            errors[0].textContent = "Vui lòng nhập số điện thoại.";
            isValid = false;
        }
        else if(!validatePhone(tel.value)){
            errors[0].textContent = "Số điện thoại phải gồm đúng 10 số.";
            isValid = false;
        }
        else{
        }
        

    ///KIỂM TRA MẬT KHẨU///
        if(password.value.trim() === ""){
            errors[1].textContent = "Vui lòng nhập mật khẩu.";
            isValid = false
        }
        else if(!validatePassword(password.value)){
            errors[1].textContent = "Mật khẩu phải có ít nhất 6 ký tự.";
            isValid = false;
        }


    ///NẾU HỢP LỆ///
        if(isValid){

            // Lấy tài khoản đã đăng ký
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Kiểm tra đã có tài khoản chưa
            if(user == null){
                alert("Chưa có tài khoản. Vui lòng đăng ký!");
                return;
            }

            // Kiểm tra thông tin đăng nhập
            if(
                tel.value.trim() === user.phone &&
                password.value === user.password
            ){

                rememberMe();

                const currentUser = {
                    name: user.name,
                    phone: user.phone
                };

                localStorage.setItem("currentUser", JSON.stringify(currentUser));

                alert("Đăng nhập thành công!");

                window.location.href="../Home/Home.html";
            }
            else{
                alert("Sai số điện thoại hoặc mật khẩu!");
            }
        }
    });

}
///CHẠY CHƯƠNG TRÌNH///
login();

///==============================///
/// ĐĂNG XUẤT
///==============================///
function logout(){

    localStorage.removeItem("currentUser");

    alert("Đăng xuất thành công!");

    window.location.href = "LI.html";
}


// Them Header va Footer
fetch("../Components/Header.html")
.then(response => response.text())
.then(data=>{

    document.getElementById("header").innerHTML=data;

    // updateHeader();

    initMenu();

    updateCartCount();

});

fetch("../Components/Footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });
