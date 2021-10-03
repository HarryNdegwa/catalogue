import {
  REVIEWS_FETCHED,
  FETCH_REVIEWS_ERROR,
  FETCH_REVIEWS_START,
} from "../actions/actionsType";

const initialState = {
  fetchingReviews: false,
};

export const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEWS_START:
      return { ...state, fetchingReviews: true };
    case REVIEWS_FETCHED:
      return { ...state, fetchingReviews: false };
    case FETCH_REVIEWS_ERROR:
      return { ...state, fetchingReviews: false };
    default:
      return state;
  }
};
