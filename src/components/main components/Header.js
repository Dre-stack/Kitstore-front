import React from 'react';
import KIT2a from '../../img/KitNew2.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SignOut, getCartItemTotalCount } from '../../actions';

class Header extends React.Component {
  state = { className: '', cart: null, mobileNav: false };

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

  renderMobileNav = () => {
    if (!this.props.isSignedIn) {
      return (
        <React.Fragment>
          <li className="header__nav-items header__mobile-nav-item">
            <Link to="/signin">Sign In</Link>
          </li>
          <li className="header__nav-items header__mobile-nav-item">
            <Link to="/user/register">Sign Up</Link>
          </li>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <li className="header__nav-items header__mobile-nav-item">
            <Link to="/user/dashboard">My Dashboard</Link>
          </li>
          <li className="header__nav-items header__mobile-nav-item">
            <Link to="/" onClick={() => this.onSignout()}>
              SignOut
            </Link>
          </li>
        </React.Fragment>
      );
    }
  };

  renderProfile = () => {
    if (!this.props.isSignedIn) {
      return (
        <ul className="header__profile-items ">
          <li className="header__nav-items">
            <Link to="/signin">Sign In</Link>
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
            <Link to="/user/dashboard">
              <i className="far fa-user-circle"></i>
            </Link>
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
        <div
          className={
            this.state.mobileNav
              ? 'header__mobile-nav open'
              : 'header__mobile-nav'
          }
        >
          <div>
            <i
              onClick={() => this.setState({ mobileNav: false })}
              className="fas fa-times fa-2x header__nav-items close"
            ></i>
          </div>
          <div className="header__search">
            <input
              className="header__search-input"
              type="text"
              placeholder="search"
            />
          </div>
          <ul className="">{this.renderMobileNav()}</ul>
        </div>
        <div className="header__logo">
          <Link to="/">
            <img
              className="header__logo-image"
              src={KIT2a}
              alt="logo"
            />
          </Link>
        </div>
        <div className="right">
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
          <div className="header__nav-items">
            <Link to="/user/cart">
              <i className="fas fa-shopping-cart">
                {' '}
                <sup>{this.getTotalCartItems()}</sup>
              </i>
            </Link>
          </div>
          <div
            className="header__hamburger"
            onClick={() => this.setState({ mobileNav: true })}
          >
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
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
