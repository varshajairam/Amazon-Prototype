import { get, sendPost, sendDelete } from '../../helpers/communicationHelper';
import * as types from './types';
import { setAlert } from './alertActions';

export const getCategories = () => (dispatch) => {
  dispatch({ type: types.GET_CATEGORIES_SENT });
  get('category').then((resp) => {
    dispatch({ type: types.GET_CATEGORIES_SUCCESS, payload: resp });
  }, (err) => {
    dispatch({ type: types.GET_CATEGORIES_FAILED });
  });
};

export const addCategory = (data, setCategoryModalOpen) => (dispatch) => {
  try {
    data.preventDefault();
    const formEl = data.target;
    dispatch({ type: types.ADD_CATEGORY_SENT });
    sendPost('category', formEl).then((resp) => {
      console.log(resp);
      dispatch({ type: types.ADD_CATEGORY_SUCCESS, resp });
      dispatch(setAlert('Category Added Successfully!', 'positive'));
      setCategoryModalOpen(false);
    }, (err) => { console.log(err); });
  } catch (error) {
    dispatch({ type: types.ADD_CATEGORY_FAILED });
  }
};

export const deleteCategory = (data, setDelModalOpen) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CATEGORY_SENT });
    const res = await sendDelete('category', data);
    if (res.status == 400) {
      dispatch({ type: types.DELETE_CATEGORY_FAILED });
      dispatch(setAlert('Category cannot be deleted!', 'negative'));
      setDelModalOpen(false);
    } else {
      dispatch({ type: types.DELETE_CATEGORY_SUCCESS, res });
      dispatch(setAlert('Category deleted Successfully!', 'positive'));
      setDelModalOpen(false);
    }
  } catch (error) {
    dispatch({ type: types.DELETE_CATEGORY_FAILED });
    dispatch(setAlert('Category cannot be deleted!', 'negative'));
    setDelModalOpen(false);
  }
};
