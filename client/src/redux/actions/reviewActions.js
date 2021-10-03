import {
  SAVE_REVIEW_START,
  REVIEW_SAVED,
  SAVE_REVIEW_ERROR,
} from "./actionsType";

export const saveReviewStart = () => {
  return {
    type: SAVE_REVIEW_START,
  };
};

export const reviewSaved = () => {
  return {
    type: REVIEW_SAVED,
  };
};

export const saveReviewError = () => {
  return {
    type: SAVE_REVIEW_ERROR,
  };
};
