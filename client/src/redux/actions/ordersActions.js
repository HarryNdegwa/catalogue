import {
  ORDERS_FETCH_START,
  ORDERS_FETCH_SUCCESS,
  ORDERS_FETCH_ERROR,
} from "./actionsType";
import axios from "../../axiosApi";

const ordersFetchStart = () => {
  return {
    type: ORDERS_FETCH_START,
  };
};

const ordersFetchSuccess = (data) => {
  return {
    type: ORDERS_FETCH_SUCCESS,
    data: data,
  };
};

const ordersFetchError = () => {
  return {
    type: ORDERS_FETCH_ERROR,
  };
};

export const ordersFetchThunkAction = () => {
  return (dispatch, getState) => {
    dispatch(ordersFetchStart());
    axios
      .get("orders/", {
        headers: {
          Authorization: "Token " + getState()._root._id,
        },
      })
      .then((res) => {
        dispatch(ordersFetchSuccess(res.data));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(ordersFetchError());
      });
  };
};
