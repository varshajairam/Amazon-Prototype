import { GET_ANALYTICS_SENT, GET_ANALYTICS_SUCCESS, GET_ANALYTICS_FAILED } from '../actions/types';

const initialState = {
    analytics: [],
    loading: false
};

const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ANALYTICS_SENT: 
    return {
        ...state,
        loading: true
    }
    case GET_ANALYTICS_SUCCESS: 
        return {
            ...state,
            analytics: action.payload,
            loading: false
        }
    default:
      return {
        ...state,
      };
  }
};

export default analyticsReducer;
