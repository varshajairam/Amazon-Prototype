import { sendPost, get } from '../../helpers/communicationHelper';

export const isLoggedIn = () => (dispatch) => {
  sendPost('auth/logged_in').then((data) => {
    if (data.logged_in) dispatch({ type: 'LOGIN', user_type: data.user_type });
  });
};

export const login = (ev) => (dispatch) => {
  ev.preventDefault();
  sendPost('auth/login', ev.target).then((resp) => {
    dispatch({ type: 'LOGIN', user_type: resp.user_type });
  }, () => {
    dispatch({ type: 'LOGIN_ERROR' });
  });
};

export const logout = () => (dispatch) => {
  get('auth/logout').then(() => {
    dispatch({ type: 'LOGOUT' });
  });
};
