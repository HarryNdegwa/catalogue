import {
  DETAILS_SAVE_START,
  DETAILS_SAVED,
  DETAILS_SAVE_ERROR,
} from "../actions/actionsType";

const initialState = {
  savingDetails: false,
  error: [],
  detailsSaved: false,
};

export const checkoutDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETAILS_SAVE_START:
      return { ...state, savingDetails: true };
    case DETAILS_SAVED:
      return { ...state, savingDetails: false, detailsSaved: true };
    case DETAILS_SAVE_ERROR:
      return { ...state, savingDetails: false, error: action.data };
    default:
      return state;
  }
};
