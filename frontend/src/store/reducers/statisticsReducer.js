
const initialState = {
  sellerStats: [],
  monthlyStats: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_SELLER_STATS':
      return {
        ...state,
        sellerStats: payload,
      };

    case 'SET_MONTHLY_STATS':
      return {
        ...state,
        monthlyStats: payload,
      };

    default:
      return state;
  }
}
