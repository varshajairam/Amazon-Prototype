import { get } from '../../helpers/communicationHelper';
import { GET_ANALYTICS_SUCCESS, GET_ANALYTICS_FAILED, GET_ANALYTICS_SENT } from './types';

export const getAnalytics = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ANALYTICS_SENT });
    const res = await get('analytics/getAnalytics');
    dispatch({ type: GET_ANALYTICS_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: GET_ANALYTICS_FAILED });
  }
};
