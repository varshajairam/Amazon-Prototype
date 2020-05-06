import { GET_CART_PRODUCTS_SUCCESS, GET_SAVED_PRODUCTS_SUCCESS } from '../actions/types';

const initialState = {
  products: [],
  savedForLater: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_CART_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
      
    case GET_SAVED_PRODUCTS_SUCCESS:
      return {
        ...state,
        savedForLater: action.payload,
      };

    //   return {
    //     ...state,
    //     redirectProduct: true,
    //     products: [...state.products]
    //   };

    default:
      return {
        ...state,
      };
  }
};

export default cartReducer;
