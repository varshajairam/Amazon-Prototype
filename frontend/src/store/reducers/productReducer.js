import { GET_PRODUCT_SUCCESS, ADD_REVIEW_SUCCESS } from '../actions/types'

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

    case ADD_REVIEW_SUCCESS:
      console.log(action.payload);

      state.products.map(product => {
        if (product._id == action.payload.product)
          product.reviews.push(action.payload)
      });

      return {
        ...state,
        redirectProduct: true,
        products: [...state.products]
      };

    default:
      return {
        ...state,
      };
  }
};

export default productReducer;
