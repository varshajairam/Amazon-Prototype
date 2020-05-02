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
  SET_ALERT
} from './types';

import { get, sendPost } from '../../helpers/communicationHelper';
import { setAlert } from './alertActions';

export const addProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PRODUCT_SENT });
    const res = await sendPost('/product', data);
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: ADD_PRODUCT_FAILED });
  }
};

export const deleteProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_SENT });
    const res = {};//await sendDelete('/product', data);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILED });
  }
};


export const updateProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_SENT });
    const res = {};//await sendPut('/product', data);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAILED });
  }
};

export const getProducts = (data) => {
  return (dispatch) => {
    let query = '/product?';

    for (let key in data) {
      if (data[key] != '') query += '&' + key + '=' + data[key];
    }

    get(query)
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
    const res = await sendPost('/product/addReview', data);
    dispatch({type: SET_ALERT, payload: {msg: "Review Added Successfully!", alertType: "positive"}})
    dispatch({ type: ADD_REVIEW_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: ADD_REVIEW_FAILED });
  }
};
