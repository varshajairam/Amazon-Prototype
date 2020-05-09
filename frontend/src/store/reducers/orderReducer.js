import {
  GET_ORDERS_SUCCESS,
  GET_ORDERS_SENT,
  GET_ORDER_SENT,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  UPDATE_ORDER_SENT,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILED,
} from "../actions/types";

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_SENT:
    case UPDATE_ORDER_SENT:
    case GET_ORDERS_SENT:
      return {
        ...state,
        loading: true,
      };

    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload.orders,
        loading: false,
      };

    case GET_ORDER_SUCCESS:
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        currentOrder: action.payload,
        loading: false,
      };

    case GET_ORDER_FAILED:
    case UPDATE_ORDER_FAILED:
      return {
        ...state,
        currentOrder: null,
        loading: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default orderReducer;
