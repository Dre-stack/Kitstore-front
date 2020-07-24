import React, { useEffect, useState, Fragment } from 'react';
import Header from '../Header';
import PageTop from '../../utils/PageTop';
import { connect } from 'react-redux';
import CartBlocks from './CartBlocks';
import { getCartTotal } from '../../utils/cartHelpers';
import { Link } from 'react-router-dom';
import { addToCart } from '../../../actions';

const Cart = ({ isSignedIn, user, addToCart }) => {
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    let items;
    if (localStorage.getItem('cart')) {
      items = JSON.parse(localStorage.getItem('cart'));
    }
    // else if (isSignedIn) {
    //   if (user) {
    //     items = user.cart;
    //   }
    // }
    setCartItems(items);
  }, [isSignedIn, user]);

  useEffect(() => {
    if (cartItems) {
      const total = getCartTotal(cartItems);
      setCartTotal(total);
    }
  }, [cartItems]);

  const removeItemFromCart = (id) => {
    const newCartItems = [...cartItems];
    const index = newCartItems.findIndex((el) => el._id === id);
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    if (isSignedIn) {
      addToCart(newCartItems);
    }
  };
  const incrementQuantity = (id) => {
    const newCartItems = [...cartItems];
    const index = newCartItems.findIndex((el) => el._id === id);
    newCartItems[index] = {
      ...newCartItems[index],
      quantity: newCartItems[index].quantity + 1,
    };
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    if (isSignedIn) {
      addToCart(newCartItems);
    }
  };
  const decrementQuantity = (id) => {
    const newCartItems = [...cartItems];
    const index = newCartItems.findIndex((el) => el._id === id);
    if (newCartItems[index].quantity > 1) {
      newCartItems[index] = {
        ...newCartItems[index],
        quantity: newCartItems[index].quantity - 1,
      };
    }
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    if (isSignedIn) {
      addToCart(newCartItems);
    }
  };
  const renderCart = () => {
    if (cartItems && cartItems.length > 0) {
      return (
        <Fragment>
          <div className="cart-main">
            <div className="cart__top">
              <h3 className="cart__top--left">Item</h3>
              <div className="cart__top--right">
                <h3>Size</h3>
                <h3>Quantity</h3>
                <h3>Price</h3>
                <h3>color</h3>
                <h3>Remove</h3>
              </div>
            </div>
            <CartBlocks
              list={cartItems}
              removeItem={(id) => removeItemFromCart(id)}
              decrementQuantity={(id) => decrementQuantity(id)}
              incrementQuantity={(id) => incrementQuantity(id)}
            />
          </div>
          <div className="cart-sum">
            <div className="cart-total">
              <h3>Total:</h3>
              <h3>{cartTotal}</h3>
            </div>
            <div className="cart-actions">
              <Link to="/checkout" className="btn">
                Checkout
              </Link>
              <Link to="/shop" className=" btn btn-secondary">
                Continue shopping
              </Link>
            </div>
          </div>
        </Fragment>
      );
    } else {
      return (
        <div className="cart-empty">
          <div>Cart Is Empty</div>
          <Link to="/shop" className=" btn">
            Continue shopping
          </Link>
        </div>
      );
    }
  };
  // console.log(cartItems);

  return (
    <div>
      <Header bgColor="white" />
      <PageTop title="My Cart" />
      <div className="cart">{renderCart()}</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isSignedIn: state.auth.isSignedIn,
});

export default connect(mapStateToProps, { addToCart })(Cart);
