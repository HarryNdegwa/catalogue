import {
  START_PRODUCT_FETCH,
  FETCHED_PRODUCT,
  STOP_PRODUCT_FETCH,
} from "../actions/actionsType";

const initialState = {
  fetchingProduct: false,
  product: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_PRODUCT_FETCH:
      return { ...state, fetchingProduct: true };
    case FETCHED_PRODUCT:
      return { ...state, product: action.data, fetchingProduct: false };
    case STOP_PRODUCT_FETCH:
      return { ...state, fetchingProduct: false };
    default:
      return state;
  }
};
