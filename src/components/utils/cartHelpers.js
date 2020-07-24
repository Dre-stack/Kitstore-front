export const addCartToLocalStorage = (product) => {
  let cart = [];

  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }

  const index = cart.findIndex((el) => el._id === product._id);
  if (index === -1) {
    cart.push({
      ...product,
      quantity: 1,
    });
  } else if (index >= 0) {
    cart[index] = {
      ...cart[index],
      quantity: cart[index].quantity + 1,
    };
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  return cart;
};

export const getCartTotal = (cartItems) => {
  let sum = 0;
  if (cartItems) {
    cartItems.forEach((item) => {
      sum += item.price * item.quantity;
    });
  }

  return sum;
};
