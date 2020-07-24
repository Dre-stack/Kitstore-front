import React, { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';
import DashboardHeader from './DashboardHeader';
import { connect } from 'react-redux';
import {
  createProduct,
  getCategories,
} from '../../../actions/adminActions';
import { Field, reduxForm, submit } from 'redux-form';
import Loader from '../../utils/Loader';

function CreateProduct({ user, history, handleSubmit }) {
  const [data, setData] = useState({
    photo: '',
    productName: '',
    price: '',
    description: '',
    quantity: '',
    sizes: '',
    category: '',
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    errMsg: '',
    errStatus: false,
  });
  const [success, setSuccess] = useState(false);

  const loadCategories = () => {
    getCategories()
      .then((data) => setCategories(data.categories))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    if (user && user.role !== 'admin') {
      history.push('/');
    }
  }, [user, history]);

  ///
  /// LOAD CATEGORIES ON COMPONENT MOUNT
  /////

  useEffect(() => {
    loadCategories();
  }, []);

  const renderCategories = () => {
    if (categories) {
      return (
        <select
          required
          onChange={handleChange('category')}
          className="full-width select-input"
        >
          <option value="">Select A Category</option>
          {categories.map((item, i) => {
            return (
              <option key={i} value={item._id}>
                {item.name}
              </option>
            );
          })}
        </select>
      );
    }
  };

  const submitAndCreateProduct = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', data.productName);
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append('qauntity', data.quantity);
    formData.append('sizes', data.sizes);
    formData.append('description', data.description);
    const { photo } = data;
    for (let i = 0; i < photo.length; i++) {
      formData.append(`photo`, photo[i]);
    }
    createProduct(formData)
      .then((data) => {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          history.push('/admin/products');
        }, 2000);
      })
      .catch((err) => {
        setError({
          ...error,
          errMsg: err.response.data.message,
          errStatus: true,
        });
        setLoading(false);
      });
  };
  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files : e.target.value;

    setData({ ...data, [name]: value });
  };

  const clearError = () => {
    setError({ errStatus: false, errMsg: '' });
  };

  const renderSuccess = () => {
    if (success) {
      return (
        <div className="message-wrapper">
          <p className="message success">
            New product {data.productName.toUpperCase()} has been
            created succesfully
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

  const renderForm = () => {
    return (
      <React.Fragment>
        <div onBlur={clearError} className="full-width">
          <form
            className="form-wrapper"
            onSubmit={submitAndCreateProduct}
          >
            <label className="form-label full-width m1rem">
              Product Name
            </label>
            <input
              type="text"
              className="text-input"
              name="productName"
              onChange={handleChange('productName')}
              value={data.productName}
              required
              placeholder="Enter Product Name"
            ></input>
            <label className="form-label full-width m1rem">
              Product Price
            </label>
            <input
              type="number"
              className="text-input"
              name="price"
              onChange={handleChange('price')}
              value={data.price}
              required
              placeholder="Enter Product Price"
            ></input>
            <label className="form-label full-width m1rem">
              Product Description
            </label>
            <input
              type="text"
              className="text-input"
              name="description"
              onChange={handleChange('description')}
              value={data.description}
              required
              placeholder="Enter Product Description"
            ></input>
            <label className="form-label full-width m1rem">
              Product Quantity
            </label>
            <input
              type="number"
              className="text-input"
              name="quantity"
              onChange={handleChange('quantity')}
              value={data.quantity}
              required
              placeholder="Enter Product Quantity"
            ></input>
            <label className="form-label full-width m1rem">
              Product Sizes
            </label>
            <input
              type="text3"
              className="text-input"
              name="sizes"
              onChange={handleChange('sizes')}
              value={data.sizes}
              required
              placeholder="Enter Product sizes seprated by comma eg(S,M,L)"
            ></input>

            <label className="form-label full-width m1rem">
              Photo
            </label>
            <input
              type="file"
              className="text-input"
              multiple
              name="photo"
              id="photo"
              accept=".jpg, .png, .jpeg"
              onChange={handleChange('photo')}
            ></input>

            {renderCategories()}
            <button type="submit" className="btn btn-type">
              Create Product
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Create New Product" />
      <div className="full-width">
        <Loader render={loading} />
        {success ? (
          renderSuccess()
        ) : (
          <React.Fragment>
            {renderError()}
            {renderForm()}
          </React.Fragment>
        )}
      </div>
    </DashboardLayout>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(CreateProduct);
