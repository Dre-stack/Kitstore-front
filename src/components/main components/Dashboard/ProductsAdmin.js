import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DashboardLayout from './DashboardLayout';
import DashboardHead from './DashboardHeader';
import { getAllProducts } from '../../../actions/adminActions';
import { Link } from 'react-router-dom';
import { pictureFromServer } from '../../utils/apiLinks';

function ProductsAdmin({ user, history }) {
  useEffect(() => {
    if (user && user.role !== 'admin') {
      history.push('/');
    }
  }, [user, history]);
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    getAllProducts()
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const renderProducts = () => {
    if (products) {
      return products.map((product, i) => (
        <div className="purchase-history__block-item" key={i}>
          <div>
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
          </div>
          <div>{product.price}</div>
          <div>{product.sold}</div>
          <div>{product.quantity}</div>
          <div>
            <Link
              to={`/admin/delete-product/${product._id}`}
              className="btn btn-type"
            >
              Delete
            </Link>
            <Link
              to={`/admin/update-product/${product._id}`}
              className="btn btn-secondary"
            >
              Update
            </Link>
          </div>
        </div>
      ));
    }
  };

  return (
    <DashboardLayout>
      <DashboardHead title="Products" />
      <div className="purchase-history__headers">
        <h3>Name</h3>
        <h3>Price</h3>
        <h3>Sold</h3>
        <h3>Quantity</h3>
        <h3>Actions</h3>
      </div>
      <div className="purchase-history__block">
        {renderProducts()}
      </div>
    </DashboardLayout>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(ProductsAdmin);
