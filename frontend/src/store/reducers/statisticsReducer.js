
const initialState = {
  sellerStats: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_SELLER_STATS':
      return {
        ...state,
        sellerStats: payload,
      };

    default:
      return state;
  }
}
