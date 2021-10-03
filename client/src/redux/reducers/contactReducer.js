import {
  START_CONTACT_SEND,
  CONTACT_SEND,
  STOP_CONTACT_SEND,
  CONTACT_SENT_FALSE,
} from "../actions/actionsType";

const initialState = {
  sendingContact: false,
  contactSent: false,
};

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_CONTACT_SEND:
      return { ...state, sendingContact: true };
    case CONTACT_SEND:
      return { ...state, contactSent: true, sendingContact: false };
    case STOP_CONTACT_SEND:
      return { ...state, sendingContact: false };
    case CONTACT_SENT_FALSE:
      return { ...state, contactSent: false };
    default:
      return state;
  }
};
