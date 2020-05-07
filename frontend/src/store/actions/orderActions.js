import { GET_ORDERS_SUCCESS, GET_ORDERS_FAILED, GET_ORDERS_SENT } from './types';
import { get, sendPost } from '../../helpers/communicationHelper';

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
