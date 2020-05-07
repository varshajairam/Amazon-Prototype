import { get, sendPost, sendDelete } from '../../helpers/communicationHelper';
import * as types from './types';
import { setAlert } from './alertActions';

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CATEGORIES_SENT });
    const res = await get('category');
    dispatch({ type: types.GET_CATEGORIES_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: types.GET_CATEGORIES_FAILED });
  }
};

export const addCategory = (data, setCategoryModalOpen) => (dispatch) => {
  try {
	data.preventDefault();
	const formEl = data.target;
    dispatch({ type: types.ADD_CATEGORY_SENT });
	sendPost('category', formEl).then((resp) => {
		dispatch({ type: types.ADD_CATEGORY_SUCCESS, resp });
		dispatch(setAlert('Category Added Successfully!', 'positive'));
		setCategoryModalOpen(false);
	  }, (err) => {console.log(err)});
  } catch (error) {
    dispatch({ type: types.ADD_CATEGORY_FAILED });
}
};

export const deleteCategory = (data, setDelModalOpen) => (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CATEGORY_SENT });
	sendDelete('category', data).then((resp) => {
		dispatch({ type: types.DELETE_CATEGORY_SUCCESS, resp });
		dispatch(setAlert('Category deleted Successfully!', 'positive'));
		setDelModalOpen(false);
	  }, (err) => {console.log(err)});
  } catch (error) {
    dispatch({ type: types.DELETE_CATEGORY_FAILED });
  }
};
