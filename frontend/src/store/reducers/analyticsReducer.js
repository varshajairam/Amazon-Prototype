import * as types from '../actions/types';

const initialState = {
  analytics: [],
  loading: false,
  analyticsTopRating: [],
  analyticsNoOfOrders: null,
  analyticsTopViewed: [],
};

const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ANALYTICS_SENT:
      return {
        ...state,
        loading: true,
      };
    case types.GET_ANALYTICS_SUCCESS:
      return {
        ...state,
        analytics: action.payload,
        loading: false,
      };
    case types.GET_TOP_FIVE_SOLD_PRODUCTS_SENT:
      return {
        ...state,
        analytics: action.payload,
        loading: false,
      };
    case types.GET_TOP_FIVE_SOLD_PRODUCTS_SUCCESS:
      return {
        ...state,
        analytics: action.payload,
        loading: false,
      };
    case types.GET_TOP_TEN_PRODUCTS_BASED_ON_RATING_SENT:
      return {
        ...state,
        analyticsTopRating: action.payload,
        loading: false,
      };
    case types.GET_TOP_TEN_PRODUCTS_BASED_ON_RATING_SUCCESS:
      return {
        ...state,
        analyticsTopRating: action.payload,
        loading: false,
      };
    case types.GET_NO_OF_ORDERS_PER_DAY_SENT:
      return {
        ...state,
        analyticsNoOfOrders: action.payload,
        loading: false,
      };
    case types.GET_TOP_TEN_PRODUCTS_VIEWED_PER_DAY_SENT:
      return {
        ...state,
        analyticsTopViewed: action.payload,
        loading: false,
      };
    case types.GET_NO_OF_ORDERS_PER_DAY_SUCCESS:
      return {
        ...state,
        analyticsNoOfOrders: action.payload,
        loading: false,
      };
    case types.GET_TOP_TEN_PRODUCTS_VIEWED_PER_DAY_SUCCESS:
      return {
        ...state,
        analyticsTopViewed: action.payload,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default analyticsReducer;
