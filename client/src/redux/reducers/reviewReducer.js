import {
  SAVE_REVIEW_START,
  REVIEW_SAVED,
  SAVE_REVIEW_ERROR,
} from "../actions/actionsType";

const initialState = {
  savingReview: false,
};

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_REVIEW_START:
      return { ...state, savingReview: true };
    case REVIEW_SAVED:
      return { ...state, savingReview: false };
    case SAVE_REVIEW_ERROR:
      return { ...state, savingReview: false };
    default:
      return state;
  }
};
