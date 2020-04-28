import { get, sendPost } from '../../helpers/communicationHelper';
import { GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILED } from './types';

export const getCategories = () => async (dispatch) => {
  try {
    const res = await get('http://localhost:3001/category');
    console.log("GETTING CATs");
    console.log(res);
    
    dispatch({ type: GET_CATEGORIES_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: GET_CATEGORIES_FAILED});
  }
};
