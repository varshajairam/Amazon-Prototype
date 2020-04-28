import { get, sendPost } from '../../helpers/communicationHelper';
import { GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILED, GET_CATEGORIES_SENT } from './types';

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORIES_SENT });
    const res = await get('/category');
    dispatch({ type: GET_CATEGORIES_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: GET_CATEGORIES_FAILED});
  }
};
