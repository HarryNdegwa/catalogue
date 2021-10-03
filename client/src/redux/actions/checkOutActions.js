import {
  DETAILS_SAVE_START,
  DETAILS_SAVED,
  DETAILS_SAVE_ERROR,
} from "./actionsType";
import axios from "../../axiosApi";

const detailsSaveStart = () => {
  return {
    type: DETAILS_SAVE_START,
  };
};

const detailsSaved = (data) => {
  return {
    type: DETAILS_SAVED,
    data: data,
  };
};

const detailsSaveError = (error) => {
  return {
    type: DETAILS_SAVE_ERROR,
    data: error,
  };
};

export const checkoutDetailsSaveThunkAction = (data) => {
  return (dispatch, getState) => {
    dispatch(detailsSaveStart());
    axios
      .put("details/", data, {
        headers: {
          Authorization: "Token " + getState()._root._id,
        },
      })
      .then((res) => {
        dispatch(detailsSaved(res.data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(detailsSaveError(error.response));
      });
  };
};
