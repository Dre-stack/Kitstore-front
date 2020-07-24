import React from 'react';
import { connect } from 'react-redux';
import {
  setShippingPriceAction,
  clearShippingPrice,
} from '../../../actions';

class Shipping extends React.Component {
  state = { shippingPrice: 40 };

  componentDidMount() {
    this.props.setShippingPriceAction(40);
  }
  // componentWillUnmount() {
  //   this.props.clearShippingPrice();
  // }

  goForward = () => {
    this.props.goToPayment(this.state.shippingPrice);
  };

  render() {
    const { goBackToAddress } = this.props;
    return (
      <div>
        <div>Shipping Flat fee {this.state.shippingPrice}</div>
        <div className="checkout-main-form__form-wrapper--actions">
          <button
            onClick={() => goBackToAddress()}
            className="btn btn-type btn-secondary"
          >
            Edit Address
          </button>
          <button onClick={this.goForward} className="btn btn-type">
            Continue to Payment
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  setShippingPriceAction,
  clearShippingPrice,
})(Shipping);
