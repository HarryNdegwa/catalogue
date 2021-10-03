import {
  ORDERS_FETCH_START,
  ORDERS_FETCH_SUCCESS,
  ORDERS_FETCH_ERROR,
} from "../actions/actionsType";

const initialState = {
  orders: null,
  fetchingOrders: false,
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDERS_FETCH_START:
      return { ...state, fetchingOrders: true };
    case ORDERS_FETCH_SUCCESS:
      return { ...state, orders: action.data, fetchingOrders: false };
    case ORDERS_FETCH_ERROR:
      return { ...state, fetchingOrders: false };
    default:
      return state;
  }
};
