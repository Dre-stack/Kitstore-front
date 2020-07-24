import {
  SET_SHIPPING_PRICE,
  CLEAR_SHIPPING_PRICE,
  SET_ORDER_SUBTOTAL,
  SET_ORDER_TOTAL,
  SET_SHIPPING_ADDRESS,
  SET_CART_ITEMS,
  CLEAR_ORDER,
  GET_USER_ORDER_HISTORY,
} from '../actions/types';

const INITIAL_STATE = {
  address: {},
  cartItems: [],
  subTotal: null,
  shipping: null,
  orderTotal: null,
  userHistory: null,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SHIPPING_PRICE:
      return {
        ...state,
        shipping: payload,
      };

    case CLEAR_SHIPPING_PRICE:
      return {
        ...state,
        shipping: null,
      };

    case SET_SHIPPING_ADDRESS:
      return {
        ...state,
        address: payload,
      };

    case SET_ORDER_SUBTOTAL:
      return {
        ...state,
        subTotal: payload,
      };

    case SET_ORDER_TOTAL:
      return {
        ...state,
        orderTotal: payload,
      };

    case SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };

    case CLEAR_ORDER:
      return { ...INITIAL_STATE };
    case GET_USER_ORDER_HISTORY:
      return {
        ...state,
        userHistory: payload,
      };
    default:
      return state;
  }
};
