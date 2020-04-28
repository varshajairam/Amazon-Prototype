import { GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILED, GET_CATEGORIES_SENT } from '../actions/types';

const initialState = {
    categories: [],
    loading: false
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_SENT: 
    return {
        ...state,
        loading: true
    }
    case GET_CATEGORIES_SUCCESS: 
        return {
            ...state,
            categories: action.payload,
            loading: false
        }
    default:
      return {
        ...state,
      };
  }
};

export default categoryReducer;
