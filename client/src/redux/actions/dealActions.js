import {
  DEAL_SAVE_START,
  DEAL_SAVED,
  DEAL_SAVE_ERROR,
  SET_DEAL_SAVED_FALSE,
  DEALS_FETCH_START,
  DEALS_FETCHED,
  DEALS_FETCH_STOP,
  DEALS_FETCH_ERROR,
} from "./actionsType";
import axios from "../../axiosApi";

const dealSaveStart = () => {
  return {
    type: DEAL_SAVE_START,
  };
};

const dealSaved = () => {
  return {
    type: DEAL_SAVED,
  };
};

const dealSaveError = () => {
  return {
    type: DEAL_SAVE_ERROR,
  };
};

export const setDealSavedFalse = () => {
  return {
    type: SET_DEAL_SAVED_FALSE,
  };
};

export const dealsFetchStart = () => {
  return {
    type: DEALS_FETCH_START,
  };
};

export const dealsFetched = () => {
  return {
    type: DEALS_FETCHED,
  };
};

export const dealsFetchStop = () => {
  return {
    type: DEALS_FETCH_STOP,
  };
};

export const dealsFetchError = () => {
  return {
    type: DEALS_FETCH_ERROR,
  };
};

export const dealSaveThunkAction = (data) => {
  return (dispatch, getState) => {
    dispatch(dealSaveStart());
    axios
      .put("product/" + data.id + "/", data)
      .then((res) => {
        dispatch(dealSaved());
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(dealSaveError());
      });
  };
};

// export const dealsFetchThunkAction = () => {
//   return (dispatch, getState) => {
//     dispatch(dealsFetchStart());
//     axios
//       .get("deals/")
//       .then((res) => {
//         console.log(res.data);
//         dispatch(dealsFetched());
//       })
//       .catch((error) => {
//         console.log(error);
//         dispatch(dealsFetchError());
//       });
//   };
// };
