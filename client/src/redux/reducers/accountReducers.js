import {
  START_UPDATE_ACCOUNT,
  UPDATED_ACCOUNT,
  ERROR_UPDATE_ACCOUNT,
} from "../actions/actionsType";

const initialState = {
  updatingAccount: false,
  updatedAccount: false,
};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_UPDATE_ACCOUNT:
      return { ...state, updatingAccount: true };
    case UPDATED_ACCOUNT:
      return { ...state, updatedAccount: true, updatingAccount: false };
    case ERROR_UPDATE_ACCOUNT:
      return { ...state, updatingAccount: false };
    default:
      return state;
  }
};
