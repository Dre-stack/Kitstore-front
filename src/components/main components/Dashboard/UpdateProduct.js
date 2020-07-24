import React, { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';
import DashboardHeader from './DashboardHeader';
import { connect } from 'react-redux';
import {
  getCategories,
  updateProduct,
} from '../../../actions/adminActions';
import { getProduct } from '../../../actions';

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

  const [productDetails, setProductDetails] = useState([]);

  const loadCategories = () => {
    getCategories()
      .then((data) => setCategories(data.categories))
      .catch((err) => console.log(err.response));
  };
  // const loadProduct = () => {
  //   getProduct(id).then(() => console.log(product));
  // };

  ///
  /// LOAD CATEGORIES ON COMPONENT MOUNT
  /////

  useEffect(() => {
    getProduct(id);
    loadCategories();
  }, [getProduct, id]);

  useEffect(() => {
    if (product) {
      setData({
        ...data,
        productName: product.name,
        price: product.price,
        quantity: product.quantity,
        sizes: product.sizes,
        category: product.category._id,
        description: product.description,
        photo: product.photo,
      });
    }
  }, [product]);

  const renderCategories = () => {
    if (categories) {
      return (
        <select
          defaultValue={data.category}
          required
          onChange={handleChange('category')}
          className="full-width select-input"
        >
          <option defaultValue="">Select A Category</option>
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
  // console.log(data.photo);

  const submitAndUpdateProduct = (e) => {
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
    if (photo) {
      console.log(photo);
      for (let i = 0; i < photo.length; i++) {
        formData.append(`photo`, photo[i]);
      }
    }

    updateProduct(formData, id)
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
        console.log(err.response);
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
            Product {data.productName.toUpperCase()} has been updated
            succesfully
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
            onSubmit={submitAndUpdateProduct}
          >
            <label className="form-label full-width m1rem">
              Product Name
            </label>
            <input
              type="text"
              className="text-input"
              name="productName"
              onChange={handleChange('productName')}
              defaultValue={data.productName}
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
              defaultValue={data.price}
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
              defaultValue={data.description}
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
              defaultValue={data.quantity}
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
              defaultValue={data.sizes}
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
              Update Product
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  };

  return (
    <DashboardLayout>
      <DashboardHeader
        title={`Update Product '${product && product.name}'`}
      />
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
  product: state.products.product,
});

export default connect(mapStateToProps, { getProduct })(
  UpdateProduct
);
