import { GET_CATEGORIES_SUCCESS, ADD_CATEGORY_SUCCESS, GET_CATEGORIES_SENT, DELETE_CATEGORY_SUCCESS } from '../actions/types';

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
		case ADD_CATEGORY_SUCCESS: 
        return {
            ...state,
			loading: false,
		}
		case DELETE_CATEGORY_SUCCESS: 
        return {
            ...state,
            loading: false
		}
    default:
      return {
        ...state,
      };
  }
};

export default categoryReducer;
