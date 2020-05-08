import {
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILED,
  GET_ORDERS_SENT,
  GET_ORDER_SENT,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  UPDATE_ORDER_SENT,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILED,
} from "./types";
import { get, sendPost, sendPut } from "../../helpers/communicationHelper";
import { setAlert } from './alertActions';

export const getOrders = (data) => async (dispatch) => {
  let query = "order?";

  for (let key in data) {
    if (data[key] != "") query += "&" + key + "=" + data[key];
  }

  try {
    dispatch({ type: GET_ORDERS_SENT });
    const res = await get(query);
    dispatch({ type: GET_ORDERS_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: GET_ORDERS_FAILED });
  }
};

export const getOrder = (data) => async (dispatch) => {
  let query = "order?";

  for (let key in data) {
    if (data[key] != "") query += "&" + key + "=" + data[key];
  }

  try {
    dispatch({ type: GET_ORDER_SENT });
    const res = await get(query);
    dispatch({ type: GET_ORDER_SUCCESS, payload: res[0] });
  } catch (error) {
    dispatch({ type: GET_ORDER_FAILED });
  }
};

export const updateOrder = (data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_SENT });
    console.log(data);
    
    const res = await sendPut("order", data);
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: res });
    dispatch(setAlert("Order Updated Successfully!", "positive"));
  } catch (error) {
    dispatch({ type: UPDATE_ORDER_FAILED });
    dispatch(setAlert("Failed to Updated Order!", "negative"));
  }
};

export const placeOrder = (data) => async (dispatch) => {
  try {
    const res = await sendPost('order/', data);
    dispatch(setAlert('Order sucessfully placed!', 'positive'));
  } catch (error) {
    dispatch(setAlert('Error in placing order', 'negative'));
  }
};
