import { get, sendPost } from '../../helpers/communicationHelper';

export const getOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDERS_SENT });
    const res = await get('orders');
    dispatch({ type: GET_ORDERS_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: GET_ORDERS_FAILED });
  }
};
