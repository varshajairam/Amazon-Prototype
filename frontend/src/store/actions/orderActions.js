import { GET_ORDERS_SUCCESS, GET_ORDERS_FAILED, GET_ORDERS_SENT } from './types';
import { get, sendPost } from '../../helpers/communicationHelper';
import { setAlert } from './alertActions';

export const getOrders = (data) => async (dispatch) => {
  let query = 'order?';

  for (let key in data) {
    if (data[key] != '') query += '&' + key + '=' + data[key];
  }

  try {
    dispatch({ type: GET_ORDERS_SENT });
    const res = await get(query);
    dispatch({ type: GET_ORDERS_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: GET_ORDERS_FAILED });
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
