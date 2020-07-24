import React, { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { connect } from 'react-redux';
import {
  getAllOrders,
  getOrderStatusValues,
  upDateOrderStatus,
} from '../../../actions/adminActions';
import { pictureFromServer } from '../../utils/apiLinks';
import moment from 'moment';
import DashboardHeader from './DashboardHeader';

function OrdersAdmin({ user, history }) {
  useEffect(() => {
    if (user && user.role !== 'admin') {
      history.push('/');
    }
  }, [user, history]);
  const [orders, setOrders] = useState();
  const [statusValues, setStatusValues] = useState();

  const loadOrders = () => {
    getAllOrders()
      .then((data) => {
        setOrders(data.orders);
      })
      .catch((err) => console.log(err.response));
  };
  const loadStatusValues = () => {
    getOrderStatusValues()
      .then((data) => {
        setStatusValues(data);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const renderProducts = (products) => {
    return products.map((product, i) => (
      <React.Fragment key={i}>
        <div className="purchase-history__block-products">
          <div className="purchase-history__block-products-image">
            <img
              src={`${pictureFromServer}/${product.photo[0]}`}
              alt={product.name}
            />
          </div>
          <div className="purchase-history__block-products-name">
            {product.name} <br />
            Quantity: {product.quantity} <br />
            Size: {product.size}
            <br />
            Color: {product.color}
          </div>
        </div>
      </React.Fragment>
    ));
  };
  const renderAddress = (address) => (
    <React.Fragment>
      <p>
        {address.firstname} {address.lastname}
      </p>
      <p>{address.address}</p>
      <p>
        {address.city}, {address.region}
      </p>
      <p>{address.country}</p>
      <p>{address.phone}</p>
    </React.Fragment>
  );

  const handleStatusUpdate = (e, id) => {
    const { value } = e.target;
    const data = { status: value };
    upDateOrderStatus(data, id)
      .then(() => {
        loadOrders();
      })
      .catch((err) => console.log(err.response));
  };

  const renderOrderBlocks = () => {
    if (orders) {
      return orders.map((item, i) => (
        <div className="purchase-history__block-item" key={i}>
          <div>{renderProducts(item.products)}</div>
          <div>{renderAddress(item.address[0])}</div>
          <div>{`${moment(item.createdAt).fromNow()}`}</div>
          <div>
            {`${item.transactionid}`} <br /> {`$${item.amount}`}
          </div>
          <div className="lh2">
            <span className="order-status">{`${item.status}`}</span>
            <br />
            <select
              onChange={(e) => handleStatusUpdate(e, item._id)}
              className="si-small"
            >
              <option>Update Status</option>
              {statusValues &&
                statusValues.map((value, i) => (
                  <option key={i} value={value}>
                    {value}
                  </option>
                ))}
            </select>
          </div>
        </div>
      ));
    }
  };

  const renderOrders = () => {
    return (
      <div className="purchase-history">
        <DashboardHeader title="Orders" />
        <div className="purchase-history__headers">
          <h3>Products Details</h3>
          <h3>Address</h3>
          <h3>Date</h3>
          <h3>
            Transaction ID <br /> Amount
          </h3>
          <h3>Status</h3>
        </div>
        <div className="purchase-history__block">
          {renderOrderBlocks()}
        </div>
      </div>
    );
  };

  return <DashboardLayout>{renderOrders()}</DashboardLayout>;
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(OrdersAdmin);
