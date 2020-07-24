import React from 'react';
import KIT2a from '../../img/newlogo.JPG';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SignOut, getCartItemTotalCount } from '../../actions';

class Header extends React.Component {
  state = { className: '', cart: null };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.props.getCartItemTotalCount();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.pageYOffset > 0) {
      if (!this.state.className) {
        this.setState({ className: 'white' });
      }
    } else {
      if (this.state.className) {
        this.setState({ className: '' });
      }
    }
  };
  // componentWillUnmount() {
  //   window.removeEventListener('scroll');
  // }
  onSignout = () => {
    this.props.SignOut();
  };

  getTotalCartItems = () => {
    if (this.props.totalCartItem) {
      return this.props.totalCartItem;
    }
    // else if (this.props.user) {
    //   const cart = this.props.user.cart;
    //   return cart.length;
    // }
  };

  renderProfile = () => {
    if (!this.props.isSignedIn) {
      return (
        <ul className="header__profile-items ">
          <li className="header__nav-items">
            <Link to="/signin">Sign In</Link>
          </li>
          <li className="header__nav-items">
            <Link to="/user/cart">
              <i className="fas fa-shopping-cart">
                {' '}
                <sup>{this.getTotalCartItems()}</sup>
              </i>
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="header__profile-items ">
          <li className="header__nav-items">
            <Link to="/" onClick={() => this.onSignout()}>
              SignOut
            </Link>
          </li>
          <li className="header__nav-items">
            <Link to="/user/cart">
              <i className="fas fa-shopping-cart">
                <sup className="header__cart-number">
                  {this.getTotalCartItems()}
                </sup>
              </i>
            </Link>
          </li>
          <li className="header__nav-items">
            <a href="/user/dashboard">
              <i className="far fa-user-circle"></i>
            </a>
          </li>
        </ul>
      );
    }
  };
  render() {
    return (
      <div
        className={`header ${this.state.className}`}
        style={{ backgroundColor: this.props.bgColor }}
      >
        <ul className="header__nav">
          <li className="header__nav-items">
            <Link to="/shop">Thrending</Link>
          </li>
          <li className="header__nav-items">
            <Link to="/shop">men</Link>
          </li>
          <li className="header__nav-items">
            <Link to="/shop">women</Link>
          </li>
          <li className="header__nav-items">
            <Link to="/shop">kids</Link>
          </li>
          <li className="header__nav-items">
            <Link to="/shop">jewellery</Link>
          </li>
        </ul>
        <div className="header__logo">
          <Link to="/">
            <img
              className="header__logo-image"
              src={KIT2a}
              alt="logo"
            />
          </Link>
        </div>

        <div className="header__profile">
          <div className="header__search">
            <input
              className="header__search-input"
              type="text"
              placeholder="search"
            />
          </div>
          {this.renderProfile()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, products } = state;
  return {
    isSignedIn: auth.isSignedIn,
    user: auth.user,
    totalCartItem: products.totalCartItem,
  };
};

export default connect(mapStateToProps, {
  SignOut,
  getCartItemTotalCount,
})(Header);
