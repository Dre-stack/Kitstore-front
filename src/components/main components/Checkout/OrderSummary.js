import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

function OrderSummary({ subTotal, shipping }) {
  const [orderTotal, setOrderTotal] = useState(0);
  useEffect(() => {
    if (shipping && subTotal) {
      setOrderTotal(shipping + subTotal);
    } else if (subTotal) {
      setOrderTotal(subTotal);
    }
  }, [shipping, subTotal]);
  return (
    <div>
      <div className="cart-sum">
        <div className="cart-total small">
          <h3>Sub-Total:</h3>
          <h3>${subTotal}</h3>
        </div>
        <div className="cart-total small">
          <h3>Shipping:</h3>
          <h3>{shipping && shipping}</h3>
        </div>
        <div className="cart-total">
          <h3>Total:</h3>
          <h3>${orderTotal}</h3>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  shipping: state.order.shipping,
  subTotal: state.order.subTotal,
});

export default connect(mapStateToProps, {})(OrderSummary);
