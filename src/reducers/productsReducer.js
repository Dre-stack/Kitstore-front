import {
  PRODUCTS_BY_ARRIVAL,
  PRODUCTS_BY_SOLD,
  GET_PRODUCT,
  CLEAR_PRODUCT_DETAIL,
  CLEAR_PRODUCTS,
  ADD_TO_CART,
  CART_TOTAL,
  GET_CATEGORIES,
  GET_PRODUCTS,
} from '../actions/types';

const INITIAL_STATE = {
  loading: true,
  prodByArrival: null,
  prodBySold: null,
  product: null,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCTS_BY_ARRIVAL:
      return {
        ...state,
        prodByArrival: payload,
        loading: false,
      };
    case PRODUCTS_BY_SOLD:
      return {
        ...state,
        prodBySold: payload,
        loading: false,
      };
    case CLEAR_PRODUCTS:
      return {
        ...state,
        prodBySold: null,
        prodByArrival: null,
        loading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false,
      };
    case CLEAR_PRODUCT_DETAIL:
      return {
        ...state,
        product: null,
        loading: false,
      };
    case ADD_TO_CART:
      return {
        ...state,
        loading: false,
        cart: payload,
      };
    case CART_TOTAL:
      if (localStorage.getItem('cart')) {
        const totalCartItem = JSON.parse(localStorage.getItem('cart'))
          .length;
        return {
          ...state,
          totalCartItem,
          loading: false,
        };
      } else return { ...state, totalCartItem: null, loading: false };
    case GET_CATEGORIES:
      return {
        ...state,
        loading: false,
        categories: payload,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        toShop: payload.products,
        shopSize: payload.size,
        loading: false,
      };

    default:
      return state;
  }
};
