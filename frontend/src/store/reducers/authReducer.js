const initialState = {
  loggedIn: false,
  loginError: false,
  registerError: false,
  user_type: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedIn: true,
        loginError: false,
        registerError: false,
        user_type: action.user_type,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        loginError: true,
      };
    case 'REGISTER':
      return {
        ...state,
        loginError: false,
        registerError: false,
      };
    case 'REGISTER_ERROR':
      return {
        ...state,
        registerError: true,
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
