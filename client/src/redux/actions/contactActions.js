import {
  START_CONTACT_SEND,
  CONTACT_SEND,
  STOP_CONTACT_SEND,
  CONTACT_SENT_FALSE,
} from "./actionsType";

import axios from "../../axiosApi";

const startContactSend = () => {
  return { type: START_CONTACT_SEND };
};

const contactSend = () => {
  return { type: CONTACT_SEND };
};

const stopContactSend = () => {
  return { type: STOP_CONTACT_SEND };
};

const setContactSentToFalse = () => {
  return {
    type: CONTACT_SENT_FALSE,
  };
};

export const contactSendThunkAction = (data) => {
  return (dispatch, getState) => {
    dispatch(startContactSend());
    axios
      .post("contact/", data)
      .then((res) => {
        dispatch(contactSend());
        setTimeout(() => {
          dispatch(setContactSentToFalse());
        }, 5000);
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(stopContactSend());
      });
  };
};
