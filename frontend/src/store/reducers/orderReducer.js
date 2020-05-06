import { GET_ORDERS_SUCCESS } from '../actions/types';

const initialState = {
  orders: []
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload.orders
      };

    default:
      return {
        ...state,
      };
  }
};

export default orderReducer;
