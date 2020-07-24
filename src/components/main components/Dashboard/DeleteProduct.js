import React, { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';
import DashboardHeader from './DashboardHeader';
import { connect } from 'react-redux';
import { deleteProduct } from '../../../actions/adminActions';
import { getProduct } from '../../../actions';
import { Link } from 'react-router-dom';
import { pictureFromServer } from '../../utils/apiLinks';

import Loader from '../../utils/Loader';

function UpdateProduct({
  user,
  history,
  match: {
    params: { id },
  },
  getProduct,
  product,
}) {
  useEffect(() => {
    if (user && user.role !== 'admin') {
      history.push('/');
    }
  }, [user, history]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    errMsg: '',
    errStatus: false,
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getProduct(id);
  }, [getProduct, id]);

  const handeDelete = (e) => {
    deleteProduct(id)
      .then((data) => {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => history.push('/admin/products'), 2000);
      })
      .catch((err) => {
        setError({
          ...error,
          errMsg: err.response.data.message,
          errStatus: true,
        });
        console.log(err.response);
        setLoading(false);
      });
  };

  const renderSuccess = () => {
    if (success) {
      return (
        <div className="message-wrapper">
          <p className="message success">
            Product {product && product.name.toUpperCase()} has been
            deleted succesfully
          </p>
        </div>
      );
    }
  };

  const renderError = () => {
    if (error.errStatus) {
      return (
        <div className="message-wrapper">
          <p className="message error">{error.errMsg}</p>
        </div>
      );
    }
  };

  const renderDelete = () => {
    if (product) {
      return (
        <div className="full-width center-contents">
          <div className="message-wrapper m1rem">
            <p className="message">
              {' '}
              Are you sure you want to delete product '{product.name}'
              ? This Action Cannot Be Reversed
            </p>
          </div>
          <div className="mhalf">
            <img
              style={{ width: '10rem' }}
              src={`${pictureFromServer}/${product.photo[0]}`}
              alt={product.name}
            />
          </div>
          <div className="half-width center-contents">
            <Link
              className="btn btn-secondary m1rem"
              to="/admin/products"
            >
              Back To Products
            </Link>
            <Link
              className="btn btn-secondary m1rem"
              to={`/admin/update-product/${product._id}`}
            >
              Update Product
            </Link>
            <button
              onClick={handeDelete}
              className="btn btn-type m1rem"
            >
              Yes Delete Product
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <DashboardLayout>
      <DashboardHeader title={`Delete Product`} />
      <div className="full-width">
        <Loader render={loading} />
        {success ? (
          renderSuccess()
        ) : (
          <React.Fragment>
            {renderError()}
            {renderDelete()}
          </React.Fragment>
        )}
      </div>
    </DashboardLayout>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  product: state.products.product,
});

export default connect(mapStateToProps, { getProduct })(
  UpdateProduct
);
