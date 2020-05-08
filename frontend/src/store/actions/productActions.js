import {
  ADD_PRODUCT_SENT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILED,
  DELETE_PRODUCT_SENT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
  UPDATE_PRODUCT_SENT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILED,
  GET_PRODUCT_SUCCESS,
  ADD_REVIEW_SENT,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILED,
} from './types';

import {
  get,
  sendPost,
  sendDelete,
  sendPut,
} from '../../helpers/communicationHelper';
import { setAlert } from './alertActions';

export const addProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PRODUCT_SENT });
    const res = await sendPost('product', data);
    dispatch(setAlert('Product Added Successfully!', 'positive'));
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: ADD_PRODUCT_FAILED });
  }
};

export const deleteProduct = (data) => async (dispatch) => {
  try {
    console.log(data);
    dispatch({ type: DELETE_PRODUCT_SENT });
    const res = await sendDelete('product', data);
    dispatch(setAlert('Review Deleted Successfully!', 'positive'));
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILED });
  }
};

export const updateProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_SENT });
    const res = await sendPut('product', data);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: res });
    dispatch(setAlert('Review Updated Successfully!', 'positive'));
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAILED });
  }
};

export const addView = (data) => async (dispatch) => {
  try {
    const res = await sendPost('product/addView', data);
  } catch (error) {
    dispatch({ type: 'ADD_VIEW_FAILED' });
  }
};

export const getProducts = (data) => {
  return (dispatch) => {
    get('product', data)
      .then((data) => {
        dispatch({
          type: GET_PRODUCT_SUCCESS,
          payload: data,
        });
      })
      .catch((err) => console.log('Some Error Occurred!'));
  };
};

export const addReview = (data) => async (dispatch) => {
  console.log('add review', data);

  try {
    dispatch({ type: ADD_REVIEW_SENT });
    const res = await sendPost('product/addReview', data);
    dispatch(setAlert('Review Added Successfully!', 'positive'));
    dispatch({ type: ADD_REVIEW_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: ADD_REVIEW_FAILED });
  }
};
