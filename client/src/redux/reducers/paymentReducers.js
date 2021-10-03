import {
  PAYMENT_START,
  PAYMENT_SUCCESS,
  PAYMENT_ERROR,
} from "../actions/actionsType";

const initialState = {
  paying: false,
  id: null,
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_START:
      return {
        ...state,
        paying: true,
      };
    case PAYMENT_SUCCESS:
      return {
        ...state,
        paying: false,
        id: action.data,
      };
    case PAYMENT_ERROR:
      return {
        ...state,
        paying: false,
      };
    default:
      return state;
  }
};
