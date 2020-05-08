import { get } from '../../helpers/communicationHelper';
import * as types from './types';

export const getAnalytics = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ANALYTICS_SENT });
    const res = await get('analytics/getAnalytics');
    dispatch({ type: types.GET_ANALYTICS_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: types.GET_ANALYTICS_FAILED });
  }
};

export const getTopFiveSoldProducts = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_TOP_FIVE_SOLD_PRODUCTS_SENT });
    const res = await get('analytics/getTopFiveSoldProducts');
    dispatch({ type: types.GET_TOP_FIVE_SOLD_PRODUCTS_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: types.GET_TOP_FIVE_SOLD_PRODUCTS_FAILED });
  }
}

export const getTopTenProductsBasedOnRatings = ()  => async (dispatch) => {
	try {
	  dispatch({ type: types.GET_TOP_TEN_PRODUCTS_BASED_ON_RATING_SENT });
	  const res = await get('analytics/getTopTenProductsBasedOnRatings');
	  dispatch({ type: types.GET_TOP_TEN_PRODUCTS_BASED_ON_RATING_SUCCESS, payload: res });
	} catch (error) {
	  dispatch({ type: types.GET_TOP_TEN_PRODUCTS_BASED_ON_RATING_FAILED });
	}
  }

  export const getNoOfOrdersPerDay = (date) => (dispatch) => {
	// const data = date ? { date } : date;
	// try {
	// 
	//   dispatch({ type: types.GET_NO_OF_ORDERS_PER_DAY_SENT });
	//   const res = await get('analytics/getNoOfOrders?date=' + data);
	//   dispatch({ type: types.GET_NO_OF_ORDERS_PER_DAY_SUCCESS, payload: res });
	// } catch (error) {
	//   dispatch({ type: types.GET_NO_OF_ORDERS_PER_DAY_FAILED });
	// }
	dispatch({ type: types.GET_NO_OF_ORDERS_PER_DAY_SENT });
	get('analytics/getNoOfOrders?date=' + date).then((resp) => {
	  dispatch({ type: types.GET_NO_OF_ORDERS_PER_DAY_SUCCESS, payload: resp });
	}, (err) => {
	  dispatch({ type: types.GET_NO_OF_ORDERS_PER_DAY_FAILED });
	});
  }

  export const getTopTenProductsViewedPerDay = (date) => (dispatch) => {
	// try {
	//   dispatch({ type: types.GET_TOP_TEN_PRODUCTS_VIEWED_PER_DAY_SENT });
	//   const res = await get('analytics/getTopTenProductsViewed');
	//   dispatch({ type: types.GET_TOP_TEN_PRODUCTS_VIEWED_PER_DAY_SUCCESS, payload: res });
	// } catch (error) {
	//   dispatch({ type: types.GET_TOP_TEN_PRODUCTS_VIEWED_PER_DAY_FAILED });
	// }
	dispatch({ type: types.GET_TOP_TEN_PRODUCTS_VIEWED_PER_DAY_SENT });
	get('analytics/getTopTenProductsViewed?date=' + date).then((resp) => {
	  dispatch({ type: types.GET_TOP_TEN_PRODUCTS_VIEWED_PER_DAY_SUCCESS, payload: resp });
	}, (err) => {
	  dispatch({ type: types.GET_TOP_TEN_PRODUCTS_VIEWED_PER_DAY_FAILED });
	});
  }