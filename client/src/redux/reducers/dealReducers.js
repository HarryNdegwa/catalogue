import {
  DEAL_SAVE_START,
  DEAL_SAVED,
  DEAL_SAVE_ERROR,
  SET_DEAL_SAVED_FALSE,
  DEALS_FETCH_START,
  DEALS_FETCHED,
  DEALS_FETCH_ERROR,
} from "../actions/actionsType";

const initialState = {
  saving: false,
  saved: false,
  fetchingDeals: false,
  dealsFetched: false,
};

export const dealReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEAL_SAVE_START:
      return { ...state, saving: true };
    case DEAL_SAVED:
      return { ...state, saving: false, saved: true };
    case DEAL_SAVE_ERROR:
      return { ...state, saving: false };
    case SET_DEAL_SAVED_FALSE:
      return { ...state, saved: false };
    case DEALS_FETCH_START:
      return { ...state, fetchingDeals: true };
    case DEALS_FETCHED:
      return { ...state, fetchingDeals: false, dealsFetched: true };
    case DEALS_FETCH_ERROR:
      return { ...state, fetchingDeals: false };
    default:
      return state;
  }
};
