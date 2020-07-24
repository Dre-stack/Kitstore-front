import { API } from '../components/utils/apiLinks';
import axios from 'axios';

export const createCategory = async (name) => {
  const data = { name };
  try {
    const response = await axios.post(`${API}/categories/new`, {
      ...data,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const createProduct = async (data) => {
  console.log(data.photo);
  try {
    const response = await axios.post(
      `${API}/products/new`,

      data
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const updateProduct = async (data, id) => {
  try {
    const response = await axios.patch(
      `${API}/products/${id}`,

      data
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API}/categories`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API}/orders`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getOrderStatusValues = async () => {
  try {
    const response = await axios.get(`${API}/orders/status-values`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const upDateOrderStatus = async (data, id) => {
  try {
    const response = await axios.patch(
      `${API}/orders/update-status/${id}`,
      { ...data }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.post(`${API}/products`, {});
    return response.data;
  } catch (err) {
    throw err;
  }
};
// export const getProduct = async (id) => {
//   try {
//     const response = await axios.get(`${API}/products/${id}`, {});
//     return response.data;
//   } catch (err) {
//     throw err;
//   }
// };
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API}/products/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
