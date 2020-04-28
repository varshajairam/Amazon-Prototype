import { get, sendPost } from '../../helpers/communicationHelper';
import { GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILED } from './types';

export const getCategories = () => async (dispatch) => {
  try {
    const res = await get('/category');
    dispatch({ type: GET_CATEGORIES_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: GET_CATEGORIES_FAILED});
  }
};
