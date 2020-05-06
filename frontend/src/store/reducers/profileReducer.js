const initialState = {
  name: '',
  email: '',
  type: '',
  profile_image: '',
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
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
