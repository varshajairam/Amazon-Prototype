/* global $ */
import { sendPost, get } from '../../helpers/communicationHelper';

export const getProducts = (email, page) => (dispatch) => {
  const data = { email, page };
  get('product', data).then((resp) => {
    dispatch({ type: 'SET_PROFILE_PRODUCTS', resp });
  });
};

export const getComments = (email) => (dispatch) => {
  const data = { email };
  get('profile/get_comments', data).then((comments) => {
    dispatch({ type: 'SET_PROFILE_COMMENTS', comments });
  });
};

export const fetchProfileData = (email) => (dispatch) => {
  const data = email ? { email } : email;
  sendPost('profile/get_profile', data).then((profile) => {
    if (profile.type === 'Seller') dispatch(getProducts(profile.email, 1));
    else if (profile.type === 'Customer') dispatch(getComments(profile.email));
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

export const addAddress = (ev, setAddressModalOpen) => (dispatch) => {
  ev.preventDefault();
  const formEl = ev.target;
  sendPost('profile/add_address', formEl).then((resp) => {
    dispatch({ type: 'ADD_ADDRESS', resp });
    formEl.reset();
    if(setAddressModalOpen) {
      setAddressModalOpen(false);
    }
  });
};

export const deleteAddress = (addressId) => (dispatch) => {
  sendPost('profile/delete_address', { addressId }).then(() => {
    dispatch({ type: 'DELETE_ADDRESS', addressId });
  });
};

export const addCard = (ev, setCardModalOpen) => (dispatch) => {
  ev.preventDefault();
  const formEl = ev.target;
  sendPost('profile/add_card', formEl).then((resp) => {
    dispatch({ type: 'ADD_CARD', resp });
    formEl.reset();
    if (setCardModalOpen) {
      setCardModalOpen(false);
    }    
  });
};

export const deleteCard = (cardId) => (dispatch) => {
  sendPost('profile/delete_card', { cardId }).then(() => {
    dispatch({ type: 'DELETE_CARD', cardId });
  });
};
