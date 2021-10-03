import {
  START_UPDATE_ACCOUNT,
  UPDATED_ACCOUNT,
  ERROR_UPDATE_ACCOUNT,
} from "./actionsType";

import axios from "../../axiosApi";

const startUpdateAccount = () => {
  return { type: START_UPDATE_ACCOUNT };
};

const updatedAccount = () => {
  return { type: UPDATED_ACCOUNT };
};

const errorUpdateAccount = () => {
  return { type: ERROR_UPDATE_ACCOUNT };
};

export const updateAccountThunkAction = (data) => {
  return (dispatch, getState) => {
    dispatch(startUpdateAccount());
    axios
      .put("details/", data, {
        headers: {
          Authorization: "Token " + getState()._root._id,
        },
      })
      .then((res) => {
        dispatch(updatedAccount());
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(errorUpdateAccount());
      });
  };
};
