import {
  SIGN_IN,
  USER_LOADED,
  AUTH_ERROR,
  SIGN_OUT,
  GET_BRAINTREE_TOKEN,
} from '../actions/types';

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isSignedIn: null,
  user: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_IN:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isSignedIn: true,
        token: payload.token,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isSignedIn: true,
        user: payload.user,
        loading: false,
      };
    case AUTH_ERROR:
    case SIGN_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isSignedIn: false,
        loading: false,
        braintreeToken: null,
        user: null,
      };
    case GET_BRAINTREE_TOKEN:
      return {
        ...state,
        loading: false,
        braintreeToken: payload,
      };
    default:
      return state;
  }
};
