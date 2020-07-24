import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getProduct,
  addToCart,
  clearProductDetail,
  getCartItemTotalCount,
} from '../../../actions';
import Header from '../Header';
import Footer from '../Footer';
import { addCartToLocalStorage } from '../../utils/cartHelpers';
import ProductImage from './ProductImage';
import { Link } from 'react-router-dom';
import PageTop from '../../utils/PageTop';

export class ProductDetails extends Component {
  state = {
    selectedSize: null,
    showNewButtons: false,
  };

  componentDidMount() {
    // localStorage.removeItem('cart');
    const id = this.props.match.params.id;
    this.props.getProduct(id);
  }
  componentWillUnmount() {
    this.props.clearProductDetail();
  }

  addToCart = () => {
    const {
      product,
      isSignedIn,
      addToCart,
      getCartItemTotalCount,
    } = this.props;
    if (product) {
      const cart = addCartToLocalStorage(product);
      getCartItemTotalCount();
      this.setState({ showNewButtons: true });
      if (isSignedIn) {
        addToCart(cart);
      }
    }
  };
  handleSize = (e) => {
    this.setState({ selectedSize: e.target.value });
  };

  renderAddtoCartButton = () => {
    const { isSignedIn, user, product } = this.props;
    let cartItems;
    if (localStorage.getItem('cart')) {
      cartItems = JSON.parse(localStorage.getItem('cart'));
    } else if (isSignedIn) {
      if (user) {
        cartItems = user.user.cart;
      }
    }
    if (product) {
      if (cartItems) {
        const index = cartItems.findIndex(
          (el) => el._id === product._id
        );
        if (this.state.showNewButtons || index !== -1) {
          return (
            <div className="product-details__actions">
              <h3>Item Added to cart</h3>
              <Link
                className="btn  btn-type product-details__actions--btn"
                to="/user/cart"
              >
                Go to cart
              </Link>
              <Link
                className="btn btn-secondary btn-type product-details__actions--btn"
                to="/shop"
              >
                Continue Shopping
              </Link>
            </div>
          );
        } else {
          return (
            <button
              className="btn btn-type"
              onClick={() => this.addToCart()}
            >
              Add To Cart
            </button>
          );
        }
      } else {
        return (
          <button
            className="btn btn-type"
            onClick={() => this.addToCart()}
          >
            Add To Cart
          </button>
        );
      }
    }
  };

  render() {
    return (
      <div>
        <Header bgColor="white" />
        <PageTop title="Product Details" />

        <div className="product">
          <div className="product__images">
            <ProductImage product={this.props.product} />
          </div>
          <div className="product-details">
            <div className="product-details__title">
              {this.props.product ? this.props.product.name : null}
            </div>

            <div className="product-details__price">
              {this.props.product
                ? `$${this.props.product.price}`
                : null}
            </div>
            <div className="product-details__info">
              <p>
                This is the where i would put the details for this
                product.
                <br />
                It is surely an amazing product that you should buy
              </p>
            </div>
            <div className="product-details__size">
              <label htmlFor="cars">Size</label>

              <select
                name="cars"
                id="cars"
                onChange={this.handleSize}
              >
                <option value={null}>Choose a Size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>

            <div className="product-details__shipping">
              <h3>Shipping</h3>
              <p>
                Shipping within the EU is free for orders above $100,
                for Worldwide Shipping please check our shipping rates
              </p>
            </div>
            {this.renderAddtoCartButton()}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { product } = state.products;
  const { isSignedIn } = state.auth;
  return { product, isSignedIn };
};

export default connect(mapStateToProps, {
  getProduct,
  addToCart,
  clearProductDetail,
  getCartItemTotalCount,
})(ProductDetails);
