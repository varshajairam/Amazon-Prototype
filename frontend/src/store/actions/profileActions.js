/* global $ */
import { sendPost } from '../../helpers/communicationHelper';

export const fetchProfileData = (email) => (dispatch) => {
  const data = email ? { email } : email;
  sendPost('profile/get_profile', data).then((profile) => {
    dispatch({ type: 'FETCH_PROFILE', profile });
  });
};

export const addProfileImage = (ev) => (dispatch) => {
  const formEl = $(ev.target).parent()[0];
  sendPost('profile/add_profile_image', formEl).then((imagePath) => {
    formEl.reset();
    dispatch({ type: 'ADD_PROFILE_IMAGE', imagePath });
  });
};

export const editProfile = (ev, setProfileModalOpen) => (dispatch) => {
  ev.preventDefault();
  const formEl = ev.target;
  sendPost('profile/edit_profile', formEl).then((resp) => {
    dispatch({ type: 'EDIT_PROFILE', resp });
    formEl.reset();
    setProfileModalOpen(false);
  });
};

export const addAddress = (ev, setaddressModalOpen) => (dispatch) => {
  ev.preventDefault();
  const formEl = ev.target;
  sendPost('profile/add_address', formEl).then((resp) => {
    dispatch({ type: 'ADD_ADDRESS', resp });
    formEl.reset();
    setaddressModalOpen(false);
  });
};

export const deleteAddress = (addressId) => (dispatch) => {
  sendPost('profile/delete_address', { addressId }).then(() => {
    dispatch({ type: 'DELETE_ADDRESS', addressId });
  });
};
