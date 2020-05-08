/* global $ */
import { sendPost, get } from '../../helpers/communicationHelper';

export const getSellers = () => (dispatch) => {
    get('users/getSellers').then((data) => {
        dispatch({ type: 'SET_SELLER_LIST', payload: data });
    });
};