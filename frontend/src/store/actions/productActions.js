import { ADD_PRODUCT_SENT, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAILED, GET_PRODUCT_SUCCESS, ADD_REVIEW_SENT, ADD_REVIEW_SUCCESS, ADD_REVIEW_FAILED } from './types'

import { get, sendPost } from '../../helpers/communicationHelper';

export const addProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PRODUCT_SENT });
    const res = await sendPost('/product', data);
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: ADD_PRODUCT_FAILED });
  }
}

export const getProducts = (data) => {
  return (dispatch) => {
    let query = "/product?";

    for (let key in data) {
      if (data[key] != "")
        query += "&" + key + "=" + data[key];
    }

    get(query)
      .then(data => {

        dispatch({
          type: GET_PRODUCT_SUCCESS,
          payload: data
        });

      }).catch(err => console.log("Some Error Occurred!"));
  }
}

export const addReview = (data) => async (dispatch) => {
  console.log('add review', data);

  try {
    dispatch({ type: ADD_REVIEW_SENT });
    const res = await sendPost('/product/addReview', data);
    alert("Review Added Successfully!");
    dispatch({ type: ADD_REVIEW_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: ADD_REVIEW_FAILED });
  }
}