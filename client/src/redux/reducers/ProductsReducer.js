import {
  // PERSIST_PRODUCTS,
  START_PRODUCTS_FETCH,
  STOP_PRODUCTS_FETCH,
  FETCHED_PRODUCTS,
  FETCH_CATEGORY_START,
  FETCH_CATEGORY_STOP,
  CATEGORY_FETCHED,
  PRODUCTS_NULL,
  SET_CATEGORY,
  SEARCH_PRODUCTS_START,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_ERROR,
  SEARCH_BAD_REQUEST,
} from "../actions/actionsType";

const initialState = {
  products: null,
  fetchingProducts: false,
  prev: null,
  next: null,
  currCategory: null,
  searching: false,
  searchBadRequest: false,
  searchPageRefreshed: false,
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return { ...state, currCategory: action.data };
    case START_PRODUCTS_FETCH:
      return { ...state, fetchingProducts: true };
    case FETCHED_PRODUCTS:
      return {
        ...state,
        fetchingProducts: false,
        products: action.data.results,
        next: action.data.next,
        prev: action.data.previous,
      };
    case PRODUCTS_NULL:
      return { ...state, products: null };
    case STOP_PRODUCTS_FETCH:
      return { ...state, fetchingProducts: false };
    case FETCH_CATEGORY_START:
      return { ...state, fetchingProducts: true };
    case CATEGORY_FETCHED:
      return { ...state, products: action.data, fetchingProducts: false };
    case FETCH_CATEGORY_STOP:
      return { ...state, fetchingProducts: false };
    case SEARCH_PRODUCTS_START:
      return { ...state, searching: true, searchBadRequest: false };
    case SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        searching: false,
        products:
          Object.keys(action.data).length > 0 ? action.data.results : [],
        next: action.data.next,
        prev: action.data.previous,
      };
    case SEARCH_PRODUCTS_ERROR:
      return { ...state, searching: false };
    case SEARCH_BAD_REQUEST:
      return { ...state, searchBadRequest: true };
    default:
      return state;
  }
};
