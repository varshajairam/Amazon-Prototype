import {
  GET_RECOMENDATION_SENT,
  GET_RECOMENDATION_SUCCESS,
  GET_RECOMENDATION_FAILED,
} from './types';

import { get } from '../../helpers/communicationHelper';

import { setAlert } from './alertActions';

export const getRecomendations = () => async (dispatch) => {
  try {
    dispatch({ type: GET_RECOMENDATION_SENT });
    const res = await get('product/recomendations');
    dispatch({ type: GET_RECOMENDATION_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: GET_RECOMENDATION_FAILED });
  }
};
