import { SubmissionError } from 'redux-form';
import {
  SIGN_IN,
  USER_LOADED,
  AUTH_ERROR,
  SIGN_OUT,
  PRODUCTS_BY_ARRIVAL,
  PRODUCTS_BY_SOLD,
  GET_PRODUCT,
  ADD_TO_CART,
  CLEAR_PRODUCT_DETAIL,
  CLEAR_PRODUCTS,
  CART_TOTAL,
  GET_CATEGORIES,
  GET_PRODUCTS,
  GET_BRAINTREE_TOKEN,
  SET_SHIPPING_PRICE,
  CLEAR_SHIPPING_PRICE,
  SET_CART_ITEMS,
  SET_ORDER_SUBTOTAL,
  SET_ORDER_TOTAL,
  SET_SHIPPING_ADDRESS,
  CLEAR_ORDER,
  GET_USER_ORDER_HISTORY,
} from './types';
import setAuthToken from '../components/utils/setAuthToken';
import axios from 'axios';
// import { useLocation } from 'react-router-dom';

import history from '../history';
import { API } from '../components/utils/apiLinks';

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${API}/users/me`);
    dispatch({ type: USER_LOADED, payload: res.data });
    // history.push('/user/dashboard');
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};
export const SignOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const signIN = (values, pathname) => async (dispatch) => {
  try {
    const response = await axios.post(`${API}/users/signin`, {
      ...values,
    });

    dispatch({ type: SIGN_IN, payload: response.data });
    history.push(pathname);
  } catch (err) {
    // throw err;
    // console.log(err.response.data.message);
    if (err.response) {
      throw new SubmissionError({
        _error: err.response.data.message,
      });
    }
  }
};

export const signUp = (values) => async (dispatch) => {
  try {
    const response = await axios.post(`${API}/users/signup`, {
      ...values,
    });

    dispatch({ type: SIGN_IN, payload: response.data });
    history.push('/');
  } catch (err) {
    if (err.response) {
      throw new SubmissionError({
        _error: err.response.data.message,
      });
    }
  }
};
export const resetPassword = (data, token) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API}/users/reset-password/${token}`,
      { ...data }
    );

    dispatch({ type: SIGN_IN, payload: response.data });
    history.push('/');
  } catch (err) {
    if (err.response) {
      throw new SubmissionError({
        _error: err.response.data.message,
      });
    }
  }
};

export const updateUser = async (values, id) => {
  try {
    const response = await axios.patch(`${API}/users/${id}`, values);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const updateUserPassword = async (values) => {
  try {
    const response = await axios.patch(
      `${API}/users/change-password`,
      values
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const addNewAddress = async (values) => {
  try {
    const response = await axios.post(
      `${API}/users/new-address`,
      values
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getProductByArrival = () => async (dispatch) => {
  const data = { sortBy: 'createdAt', limit: 4 };
  const response = await axios.post(`${API}/products`, { ...data });

  dispatch({ type: PRODUCTS_BY_ARRIVAL, payload: response.data });
};
export const getProductBySold = () => async (dispatch) => {
  const data = { sortBy: 'sold', limit: 4 };
  const response = await axios.post(`${API}/products`, { ...data });

  dispatch({ type: PRODUCTS_BY_SOLD, payload: response.data });
};
export const clearProducts = () => {
  return {
    type: CLEAR_PRODUCTS,
    payload: '',
  };
};

export const getProduct = (id) => async (dispatch) => {
  const response = await axios.get(`${API}/products/${id}`);

  dispatch({ type: GET_PRODUCT, payload: response.data.product });
};

export const clearProductDetail = () => {
  return {
    type: CLEAR_PRODUCT_DETAIL,
    payload: '',
  };
};

export const addToCart = (cart) => async (dispatch) => {
  const response = await axios.post(`${API}/products/addtocart`, {
    cart: [...cart],
  });

  dispatch({ type: ADD_TO_CART, payload: response.data });
};

export const getCartItemTotalCount = () => {
  return { type: CART_TOTAL };
};

export const getAllCategories = () => async (dispatch) => {
  const response = await axios.get(`${API}/categories`);

  dispatch({
    type: GET_CATEGORIES,
    payload: response.data.categories,
  });
};

export const getProductsToShop = (
  skip,
  limit,
  filters = [],
  previousProducts = []
) => async (dispatch) => {
  const data = { skip, limit, filters };

  const response = await axios.post(`${API}/products`, { ...data });

  let mergedProducts = [
    ...previousProducts,
    ...response.data.products,
  ];
  let results = {
    size: response.data.size,
    products: mergedProducts,
  };

  dispatch({ type: GET_PRODUCTS, payload: results });
};

export const getBraintreeToken = () => async (dispatch) => {
  const response = await axios.get(`${API}/braintree/gettoken`);

  dispatch({
    type: GET_BRAINTREE_TOKEN,
    payload: response.data.clientToken,
  });
};

export const processPayment = async (paymentData) => {
  // console.log(paymentData);
  try {
    const response = await axios.post(`${API}/braintree/pay`, {
      ...paymentData,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const forgotPassword = async (data) => {
  // console.log(paymentData);
  try {
    const response = await axios.post(
      `${API}/users/forgot-password`,
      { ...data }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const createOrder = async (
  products,
  address,
  transactionid,
  amount
) => {
  const data = {
    products,
    address: [address],
    transactionid,
    amount,
  };
  await axios.post(`${API}/orders/create`, { ...data });
};

export const setShippingPriceAction = (amount) => {
  return {
    type: SET_SHIPPING_PRICE,
    payload: amount,
  };
};
export const clearShippingPrice = () => {
  return { type: CLEAR_SHIPPING_PRICE };
};

export const sendCartToOrder = (items) => {
  return {
    type: SET_CART_ITEMS,
    payload: items,
  };
};

export const sendAddressToOrder = (address) => {
  return {
    type: SET_SHIPPING_ADDRESS,
    payload: address,
  };
};

export const sendOrderSubTotal = (subTotal) => {
  return {
    type: SET_ORDER_SUBTOTAL,
    payload: subTotal,
  };
};

export const sendOrderTotal = (total) => {
  return {
    type: SET_ORDER_TOTAL,
    payload: total,
  };
};

export const clearOrder = () => {
  return {
    type: CLEAR_ORDER,
  };
};

export const getUserOrderHistory = () => async (dispatch) => {
  const response = await axios.get(`${API}/orders/user`);

  dispatch({ type: GET_USER_ORDER_HISTORY, payload: response.data });
};
