import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productsReducer from './productsReducer';
import orderReducer from './orderReducer';
import { reducer as reduxReducer } from 'redux-form';

export default combineReducers({
  form: reduxReducer,
  auth: authReducer,
  products: productsReducer,
  order: orderReducer,
});
