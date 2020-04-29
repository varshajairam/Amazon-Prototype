import { GET_PRODUCT_SUCCESS } from '../actions/types'

const initialState = {
  products: [],
  total: 0,
  limit: 0
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        total: action.payload.total,
        limit: action.payload.limit
      };

    default:
      return {
        ...state,
      };
  }
};

export default productReducer;
