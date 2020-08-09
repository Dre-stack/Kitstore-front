import React, { useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { connect } from 'react-redux';
import { getUserOrderHistory } from '../../../actions';
import { pictureFromServer } from '../../utils/apiLinks';
import moment from 'moment';
import DashboardHeader from './DashboardHeader';
import { Link } from 'react-router-dom';

function PurchaseHistory({ userHistory, user, getUserOrderHistory }) {
  useEffect(() => {
    if (user) {
      getUserOrderHistory();
    }
  }, [getUserOrderHistory, user]);

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
            {product.name}
          </div>
        </div>
      </React.Fragment>
    ));
  };

  const renderHistoryBlocks = () => {
    if (userHistory && userHistory.length > 0) {
      return userHistory.map((item, i) => (
        <div className="purchase-history__block-item" key={i}>
          <div>{renderProducts(item.products)}</div>
          <div>{`$${item.amount}`}</div>
          <div>{`${moment(item.createdAt).fromNow()}`}</div>
          <div>{`${item.transactionid}`}</div>
          <div>{`${item.status}`}</div>
        </div>
      ));
    } else {
      return (
        <div className="full-width center-contents m1rem">
          <div className="message-wrapper">
            You have not bought any item yet
          </div>

          <Link className="btn " to="/shop">
            {' '}
            Shop Now
          </Link>
        </div>
      );
    }
  };

  const renderPurchaseHistory = () => {
    return (
      <div className="purchase-history">
        <DashboardHeader title="Purchase History" />
        <div className="purchase-history__headers">
          <h3>Products</h3>
          <h3>Total Amount</h3>
          <h3>Date</h3>
          <h3>Transaction ID</h3>
          <h3>Status</h3>
        </div>
        <div className="purchase-history__block">
          {renderHistoryBlocks()}
        </div>
      </div>
    );
  };

  return <DashboardLayout>{renderPurchaseHistory()}</DashboardLayout>;
}

const mapStateToProps = (state) => ({
  userHistory: state.order.userHistory,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getUserOrderHistory })(
  PurchaseHistory
);
