const initialState = {
  loggedIn: false,
  loginError: true,
  user_type: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedIn: true,
        loginError: false,
        user_type: action.user_type,
      };
    case 'LOGOUT':
      return {
        ...state,
        loggedIn: false,
        user_type: '',
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
