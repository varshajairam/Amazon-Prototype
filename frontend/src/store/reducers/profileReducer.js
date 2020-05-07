const initialState = {
  name: '',
  email: '',
  type: '',
  profile_image: '',
  user_addresses: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PROFILE':
      return {
        ...state,
        ...action.profile,
      };
    case 'ADD_PROFILE_IMAGE':
      return {
        ...state,
        profile_image: action.imagePath,
      };
    case 'EDIT_PROFILE':
      return {
        ...state,
        ...action.resp,
      };
    case 'ADD_ADDRESS':
      return {
        ...state,
        user_addresses: state.user_addresses.concat([action.resp]),
      };
    case 'DELETE_ADDRESS':
      return {
        ...state,
        user_addresses: state.user_addresses.filter((address) => address.id !== action.addressId),
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
