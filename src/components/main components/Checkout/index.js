import React, { useEffect, useState } from 'react';
import Header from '../Header';
import PageTop from '../../utils/PageTop';
import { connect } from 'react-redux';
import {
  getBraintreeToken,
  processPayment,
  createOrder,
  getCartItemTotalCount,
  sendCartToOrder,
  sendOrderSubTotal,
  clearOrder,
} from '../../../actions';
import DropIn from 'braintree-web-drop-in-react';
import { getCartTotal } from '../../utils/cartHelpers';
import setAuthToken from '../../utils/setAuthToken';
import Loader from '../../utils/Loader';
import { Link } from 'react-router-dom';
import CheckoutDetails from './CheckoutDetails';
import Shipping from './Shipping';
import OrderSummary from './OrderSummary';

///Fix the Loading Spinner and send order to backend
/// Create Error Message for Payment Failure

const Checkout = ({
  auth,
  getBraintreeToken,
  getCartItemTotalCount,
  sendCartToOrder,
  sendOrderSubTotal,
  order,
}) => {
  const [state, setState] = useState({
    success: false,
    loading: false,
    instance: {},
    error: '',
    addressFromUserData: {},
    page: 1,
  });
  useEffect(() => {
    const cartItemsFromStorage = JSON.parse(
      localStorage.getItem('cart')
    );
    if (cartItemsFromStorage) {
      // console.log(cartItemsFromStorage);
      const subTotal = getCartTotal(cartItemsFromStorage);
      sendCartToOrder(cartItemsFromStorage);
      sendOrderSubTotal(subTotal);
    }
  }, [sendCartToOrder, sendOrderSubTotal]);

  useEffect(() => {
    setAuthToken(auth.token);
    getBraintreeToken();
  }, [getBraintreeToken, auth.token]);

  //////*********************** */
  // PROCESS ORDER
  /////////***************** */

  const buy = async () => {
    // setState({ ...state, loading: true });
    const { nonce } = await state.instance.requestPaymentMethod();
    // console.log(order);
    const { address, cartItems, shipping, subTotal } = order;
    const paymentData = {
      paymentMethodNonce: nonce,
      amount: shipping + subTotal,
    };

    processPayment(paymentData)
      .then((result) => {
        console.log(result);
        if (result.success) {
          const { id, amount } = result.transaction;

          //create order and send to the backend
          createOrder(cartItems, address, id, amount);
          //empty the cart
          localStorage.removeItem('cart');
          // clear cart count on header
          getCartItemTotalCount();

          // clear order from state
          clearOrder();

          setState({ ...state, success: true });
        } else {
          setState({ ...state, error: result.message });
        }

        // setState({ ...state, loading: false });
        //show success message
      })
      .catch((err) => {
        setState({
          ...state,
          loading: false,
          error: 'Payment Failed Please Try Again',
        });

        //show error message
      });
  };

  // RENDER PAYMENT FORM

  const renderDropIn = () => {
    if (auth.braintreeToken) {
      return (
        <div>
          <DropIn
            options={{
              authorization: auth.braintreeToken,
              paypal: {
                flow: 'vault',
              },
            }}
            onInstance={(instance) => (state.instance = instance)}
          />
          <button onClick={buy} className="btn btn-type">
            Pay
          </button>
        </div>
      );
    }
  };

  //RENDER CHECKOUT SUCCESS  MESSAGE AFTER PAYMENT PROCESSING

  const renderCheckoutSuccess = () => {
    return (
      <div className="checkout-success">
        <div className="checkout-success__message">
          Thank You, your payment has been processed succesfully .🤩{' '}
          <br /> You will receive an email shortly containing updates
          about your order
        </div>
        <div className="checkout-success__actions">
          <Link to="/shop" className="btn">
            Continue Shopping
          </Link>
          <Link to="/user/dashboard" className="btn  btn-secondary">
            My Account
          </Link>
        </div>
      </div>
    );
  };

  ///*************************** */
  // MAIN CHECKOUT MULTIPART FORM
  /////*************************** *//

  const renderCheckoutForm = () => {
    return (
      <div className="checkout-main">
        <div className="checkout-main-form">
          <div className="checkout-main-form__top">
            <div
              className={`checkout-main-form__top-bar ${
                state.page === 1 && 'active'
              }`}
            >
              User Information
            </div>
            <div
              className={`checkout-main-form__top-bar ${
                state.page === 2 && 'active'
              }`}
            >
              Shipping
            </div>
            <div
              className={`checkout-main-form__top-bar ${
                state.page === 3 && 'active'
              }`}
            >
              Payment
            </div>
          </div>
          {renderPage()}
        </div>
        <div className="checkout-main-order-summary">
          <OrderSummary subTotal={state.subTotal} />
        </div>
      </div>
    );
  };
  const renderCheckout = () => {
    if (state.success) {
      return renderCheckoutSuccess();
    } else {
      return renderCheckoutForm();
    }
  };

  // HANDLE ADDRESS DETAILS SUBMIT AND SWICTH TO SHIPPING TAB

  const handleAddressSubmit = () => {
    setState({ ...state, page: 2 });
  };
  const goToPayment = (shippingPrice) => {
    setState({
      ...state,
      page: 3,
    });
  };
  const goBackToAddress = () => {
    setState({ ...state, page: 1 });
  };

  const renderPage = () => {
    switch (state.page) {
      case 1:
        return (
          <CheckoutDetails
            handleSubmit={() => handleAddressSubmit()}
          />
        );
      case 2:
        return (
          <Shipping
            goToPayment={(shippingPrice) =>
              goToPayment(shippingPrice)
            }
            goBackToAddress={goBackToAddress}
          />
        );
      case 3:
        return renderDropIn();
      default:
        return null;
    }
  };
  /////****************** */
  /////   MAIN COMPONENT JSX
  ////////*********************** */

  return (
    <div>
      <Header bgColor="white" />
      <PageTop title="checkout" />
      <div className="checkout">
        {state.loading ? <Loader /> : renderCheckout()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.order,
});

export default connect(mapStateToProps, {
  getBraintreeToken,
  getCartItemTotalCount,
  sendOrderSubTotal,
  sendCartToOrder,
  clearOrder,
})(Checkout);
