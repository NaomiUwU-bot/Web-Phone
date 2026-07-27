

function addToCart(newProduct){
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let existIndex = currentUser.inCartProducts.findIndex(product=> product.name === newProduct.name);
  if (newProduct){
    if (existIndex!==-1){ //Nếu đã tồn tại trong giỏ hàng, tăng số lượng lên 1
      currentUser.inCartProducts[existIndex].quantity +=1;
      window.alert('Sản phẩm đã có sẵn trong giỏ hàng.\nTăng số lượng sản phẩm lên 1.');
    }else{
      window.alert('Đã thành công thêm vào giỏ hàng!');
      currentUser.inCartProducts.push(newProduct);
    }
  }
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users[currentUser.id] = currentUser;
  localStorage.setItem('users', JSON.stringify(users));
  updateCartCount();
}
