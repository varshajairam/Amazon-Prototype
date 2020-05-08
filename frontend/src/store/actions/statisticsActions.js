import { get } from '../../helpers/communicationHelper';

export const getSellerStatistics = () => async (dispatch) => {
  try {
    const res = await get('analytics/sellerProducts');
    console.log('res', res);
    dispatch({ type: 'SET_SELLER_STATS', payload: res });
  } catch (error) {
    dispatch({ type: 'GET_CATEGORIES_FAILED' });
  }
};

export const getMonthlyStatistics = ({ startDate, endDate }) => async (dispatch) => {
  try {
    const res = await get('analytics/sellerMonthly?startDate=' + startDate + '&endDate=' + endDate);
    console.log('res', res);
    dispatch({ type: 'SET_MONTHLY_STATS', payload: res });
  } catch (error) {
    dispatch({ type: 'GET_CATEGORIES_FAILED' });
  }
};