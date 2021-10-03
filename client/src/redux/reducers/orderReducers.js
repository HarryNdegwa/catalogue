import {
  ORDER_FETCH_START,
  ORDER_FETCH_SUCCESS,
  ORDER_FETCH_ERROR,
} from "../actions/actionsType";

const initialState = {
  order: null,
  fetchingOrder: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_FETCH_START:
      return { ...state, fetchingOrder: true };
    case ORDER_FETCH_SUCCESS:
      return { ...state, order: action.data, fetchingOrder: false };
    case ORDER_FETCH_ERROR:
      return { ...state, fetchingOrder: false };
    default:
      return state;
  }
};
