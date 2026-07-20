
///HÀM LƯU GIỎ HÀNG///
    //Chức năng: Lưu danh sách sản phẩm trong giỏ hàng vào Local Storage.
    function saveCart(cart){
        localStorage.setItem("cart", JSON.stringify(cart));
    }



///HÀM TẢI GIỎ HÀNG///
    //Chức năng: Lấy dữ liệu giỏ hàng từ Local Storage.
    //Nếu chưa có giỏ hàng thì trả về mảng rỗng.
    function loadCart(){
        let cart = localStorage.getItem("cart");
        if(cart){
            return JSON.parse(cart);
        }
        return [];
    }



///HÀM LƯU NGƯỜI DÙNG///
    //Chức năng: Lưu thông tin người dùng sau khi đăng ký hoặc đăng nhập//
    function saveUser(user){
        localStorage.setItem("user", JSON.stringify(user));
    }



///HÀM TẢI NGƯỜI DÙNG///
    //Chức năng: Đọc thông tin người dùng đã lưu//
    //Nếu chưa có dữ liệu thì trả về null//
    function loadUser(){
        let user = localStorage.getItem("user");
        if(user){
            return JSON.parse(user);
        }
        return null;
    }