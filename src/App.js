import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

// import Header from './components/main components/Header';
// import Footer from './components/main components/Footer';
import Home from './components/main components/Home';
import Shop from './components/main components/Shop';
import Signin from './components/main components/Signin';
import ProductDetails from './components/main components/ProductDetails';
import history from './history';
import { loadUser } from './actions';
import Dashboard from './components/main components/Dashboard/';
import PrivateRoute from './components/Routing/privateRoute';
import './sass/main.scss';
import Cart from './components/main components/Cart';
import Checkout from './components/main components/Checkout';
import PurchaseHistory from './components/main components/Dashboard/PurchaseHistory';
// import AdminRoute from './components/Routing/adminRoute';
import CreateCategory from './components/main components/Dashboard/CreateCategory';
import CreateProduct from './components/main components/Dashboard/CreateProduct';
import ProductsAdmin from './components/main components/Dashboard/ProductsAdmin';
import UpdateProduct from './components/main components/Dashboard/UpdateProduct';
import DeleteProduct from './components/main components/Dashboard/DeleteProduct';
import Addresses from './components/main components/Dashboard/Address';
import UpdateUser from './components/main components/Dashboard/UpdateUser';
import ChangePassword from './components/main components/Dashboard/ChangePassword';
import OrdersAdmin from './components/main components/Dashboard/OrdersAdmin';
import CreateAccount from './components/main components/CreateAcount';
import ForgotPassword from './components/main components/ForgotPassword';
import ResetPassword from './components/main components/ResetPassword';
import Footer from './components/main components/Footer';

class App extends React.Component {
  componentDidMount() {
    this.props.loadUser();
    var docWidth = document.documentElement.offsetWidth;
    [].forEach.call(document.querySelectorAll('*'), function (el) {
      if (el.offsetWidth > docWidth) {
        console.log(el);
      }
    });
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <div className="app-wrapper">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/signin" exact component={Signin} />
              <Route path="/shop" exact component={Shop} />
              <Route path="/user/cart" exact component={Cart} />
              <Route
                path="/user/forgot-password"
                exact
                component={ForgotPassword}
              />
              <Route
                path="/user/reset-password/:token"
                exact
                component={ResetPassword}
              />
              <Route
                path="/user/register"
                exact
                component={CreateAccount}
              />
              <Route
                path="/products/:id"
                exact
                component={ProductDetails}
              />
              <PrivateRoute
                path="/user/dashboard"
                exact
                component={Dashboard}
              />
              <PrivateRoute
                path="/user/edit"
                exact
                component={UpdateUser}
              />
              <PrivateRoute
                path="/user/change-password"
                exact
                component={ChangePassword}
              />
              <PrivateRoute
                path="/user/purchase-history"
                exact
                component={PurchaseHistory}
              />
              <PrivateRoute
                path="/checkout"
                exact
                component={Checkout}
              />
              <PrivateRoute
                path="/user/addresses"
                exact
                component={Addresses}
              />
              <PrivateRoute
                path="/admin/create-category"
                exact
                component={CreateCategory}
              />
              <PrivateRoute
                path="/admin/create-product"
                exact
                component={CreateProduct}
              />
              <PrivateRoute
                path="/admin/products"
                exact
                component={ProductsAdmin}
              />
              <PrivateRoute
                path="/admin/delete-product/:id"
                exact
                component={DeleteProduct}
              />
              <PrivateRoute
                path="/admin/update-product/:id"
                exact
                component={UpdateProduct}
              />
              <PrivateRoute
                path="/admin/orders"
                exact
                component={OrdersAdmin}
              />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(null, { loadUser })(App);
