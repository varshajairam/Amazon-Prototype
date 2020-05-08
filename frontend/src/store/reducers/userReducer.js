const initialState = {
  sellers: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_SELLER_LIST':
      return {
        ...state,
        sellers: payload
      };

    default:
      return state;
  }
}