function isLogin(){
    return localStorage.getItem('currentUser') !== null;
}

function logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('selectedProducts');
    localStorage.removeItem('state');
}

function loadUser(user){
    localStorage.setItem("currentUser", JSON.stringify(user));
}