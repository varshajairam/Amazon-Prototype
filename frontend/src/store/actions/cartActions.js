import {
  ADD_TO_CART,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILED,
  GET_CART_PRODUCTS,
  GET_CART_PRODUCTS_SUCCESS,
  GET_CART_PRODUCTS_FAILED,
  CHANGE_PRODUCT_QTY,
  CHANGE_PRODUCT_QTY_FAILED,
  REMOVE_PRODUCT_FROM_CART_FAILED,
  SAVE_FOR_LATER,
  SAVE_FOR_LATER_FAILED,
  GET_SAVED_PRODUCTS,
  GET_SAVED_PRODUCTS_FAILED,
  GET_SAVED_PRODUCTS_SUCCESS,
  MOVE_TO_CART,
  MOVE_TO_CART_FAILED,
  REMOVE_SAVED_PRODUCT,
  REMOVE_SAVED_PRODUCT_FAILED,
} from './types';

import { get, sendPost } from '../../helpers/communicationHelper';
import { setAlert } from './alertActions';

export const addProductToCart = (data) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART });
    const res = await sendPost('cart/addToCart', data);
    dispatch(setAlert('Product added to cart!', 'positive'));
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: res });
  } catch (error) {
    dispatch(setAlert(error.responseText, 'negative'));
    dispatch({ type: ADD_TO_CART_FAILED });
  }
};

export const getCartProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_PRODUCTS });
    const res = await get('cart/getCartProducts');
    dispatch({ type: GET_CART_PRODUCTS_SUCCESS, payload: res });
  } catch (error) {
    dispatch(setAlert(error.responseText, 'negative'));
    dispatch({ type: GET_CART_PRODUCTS_FAILED });
  }
};

export const changeProductQuantity = (data) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_PRODUCT_QTY });
    const res = await sendPost('cart/changeProductQuantity', data);
    if (res) {
      dispatch({ type: GET_CART_PRODUCTS_SUCCESS, payload: res });
    }
  } catch (error) {
    dispatch(setAlert(error.responseText, 'negative'));
    dispatch({ type: CHANGE_PRODUCT_QTY_FAILED });
  }
};

export const saveForLater = (data) => async (dispatch) => {
  try {
    dispatch({ type: SAVE_FOR_LATER });
    const res = await sendPost('cart/saveForLater', data);
    dispatch({ type: GET_CART_PRODUCTS_SUCCESS, payload: res.cartResponse });
    dispatch({ type: GET_SAVED_PRODUCTS_SUCCESS, payload: res.response });
  } catch (error) {
    dispatch(setAlert(error.responseText, 'negative'));
    dispatch({ type: SAVE_FOR_LATER_FAILED });
  }
};

export const removeProductFromCart = (data) => async (dispatch) => {
  try {
    const res = await sendPost('cart/removeProduct', data);
    if (res) {
      dispatch({ type: GET_CART_PRODUCTS_SUCCESS, payload: res });
    }
  } catch (error) {
    dispatch(setAlert(error.responseText, 'negative'));
    dispatch({ type: REMOVE_PRODUCT_FROM_CART_FAILED });
  }
};

export const getSavedProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SAVED_PRODUCTS });
    const res = await get('saveForLater/getProducts');
    dispatch({ type: GET_SAVED_PRODUCTS_SUCCESS, payload: res });
  } catch (error) {
    dispatch(setAlert(error.responseText, 'negative'));
    dispatch({ type: GET_SAVED_PRODUCTS_FAILED });
  }
};

export const moveToCart = (data) => async (dispatch) => {
  try {
    dispatch({ type: MOVE_TO_CART });
    const res = await sendPost('saveForLater/moveToCart', data);
    dispatch({ type: GET_CART_PRODUCTS_SUCCESS, payload: res.response });
    dispatch({ type: GET_SAVED_PRODUCTS_SUCCESS, payload: res.savedResponse });
  } catch (error) {
    dispatch(setAlert(error.responseText, 'negative'));
    dispatch({ type: MOVE_TO_CART_FAILED });
  }
};

export const removeSavedProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_SAVED_PRODUCT });
    const res = await sendPost('saveForLater/removeProduct', data);
    dispatch({ type: GET_SAVED_PRODUCTS_SUCCESS, payload: res });
  } catch (error) {
    dispatch(setAlert(error.responseText, 'negative'));
    dispatch({ type: REMOVE_SAVED_PRODUCT_FAILED });
  }
};
