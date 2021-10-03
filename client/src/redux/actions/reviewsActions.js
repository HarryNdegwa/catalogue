import {
  FETCH_REVIEWS_START,
  REVIEWS_FETCHED,
  FETCH_REVIEWS_ERROR,
} from "./actionsType";

export const fetchReviewsStart = () => {
  return {
    type: FETCH_REVIEWS_START,
  };
};
export const reviewsFetched = () => {
  return {
    type: REVIEWS_FETCHED,
  };
};
export const fetchReviewsError = () => {
  return {
    type: FETCH_REVIEWS_ERROR,
  };
};
