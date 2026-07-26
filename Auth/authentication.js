//Hàm kiểm tra xem người dùng đã đăng nhập hay chưa
function isLogin(){
    return localStorage.getItem('currentUser') !== null;
}
//Hàm giúp xóa các thông tin của user hiện tại khi đăng xuất khỏi localStorage
function logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('selectedProducts');
    localStorage.removeItem('state');
}
//Hàm tải người dùng hiện tại vào localStorage sau khi họ đăng nhập
function loadUser(user){
    localStorage.setItem("currentUser", JSON.stringify(user));
}