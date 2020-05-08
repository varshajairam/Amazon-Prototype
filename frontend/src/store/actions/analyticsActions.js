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

export const getTopTenProductsBasedOnRatings = () => async (dispatch) => {
	try {
	  dispatch({ type: types.GET_TOP_TEN_PRODUCTS_BASED_ON_RATING_SENT });
	  const res = await get('analytics/getTopTenProductsBasedOnRatings');
	  dispatch({ type: types.GET_TOP_TEN_PRODUCTS_BASED_ON_RATING_SUCCESS, payload: res });
	} catch (error) {
	  dispatch({ type: types.GET_TOP_TEN_PRODUCTS_BASED_ON_RATING_FAILED });
	}
  }