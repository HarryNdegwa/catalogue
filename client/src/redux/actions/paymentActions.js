import axios from "../../axiosApi";
import { PAYMENT_START, PAYMENT_SUCCESS, PAYMENT_ERROR } from "./actionsType";
import { history } from "../../index";
import { fetchCartCountThunkAction } from "../actions/cartActions";
import { persistOrderId } from "../actions/rootActions";

const paymentStart = () => {
  return {
    type: PAYMENT_START,
  };
};

const paymentSuccess = () => {
  return {
    type: PAYMENT_SUCCESS,
  };
};

const paymentError = () => {
  return {
    type: PAYMENT_ERROR,
  };
};

export const paymentThunkAction = (data) => {
  return (dispatch, getState) => {
    dispatch(paymentStart());
    axios
      .post("orders/", data, {
        headers: {
          Authorization: "Token " + getState()._root._id,
        },
      })
      .then((response) => {
        dispatch(paymentSuccess(response.data.id));
        dispatch(persistOrderId(response.data.id));
        history.push("/payment-success");
        dispatch(fetchCartCountThunkAction());
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(paymentError());
        history.push("/payment-error");
      });
  };
};
