const initialState = {
  name: '',
  email: '',
  type: '',
  profile_image: '',
  user_addresses: [],
  user_cards: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PROFILE':
      return {
        ...state,
        ...action.profile,
      };
    case 'ADD_PROFILE_IMAGE':
      return {
        ...state,
        profile_image: action.imagePath,
      };
    case 'EDIT_PROFILE':
      return {
        ...state,
        ...action.resp,
      };
    case 'ADD_ADDRESS':
      return {
        ...state,
        user_addresses: state.user_addresses.concat([action.resp]),
      };
    case 'DELETE_ADDRESS':
      return {
        ...state,
        user_addresses: state.user_addresses.filter((address) => address.id !== action.addressId),
      };
    case 'ADD_CARD':
      return {
        ...state,
        user_cards: state.user_cards.concat([action.resp]),
      };
    case 'DELETE_CARD':
      return {
        ...state,
        user_cards: state.user_cards.filter((card) => card.id !== action.cardId),
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
