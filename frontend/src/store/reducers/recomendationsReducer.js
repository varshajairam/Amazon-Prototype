import {
  GET_RECOMENDATION_SENT,
  GET_RECOMENDATION_SUCCESS,
  GET_RECOMENDATION_FAILED,
} from '../actions/types';

const initialState = {
  recomendations: [],
  loading: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECOMENDATION_SENT:
      return {
        ...state,
        loading: true,
      };

    case GET_RECOMENDATION_SUCCESS:
      return {
        ...state,
        loading: false,
        recomendations: [...action.payload],
      };

    case GET_RECOMENDATION_FAILED:
      return {
        ...state,
        loading: false,
        recomendations: [],
      };

    default:
      return {
        ...state,
      };
  }
};

export default productReducer;
