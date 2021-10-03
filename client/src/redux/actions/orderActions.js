import {
  ORDER_FETCH_START,
  ORDER_FETCH_SUCCESS,
  ORDER_FETCH_ERROR,
} from "./actionsType";
import axios, { BASE_URL } from "../../axiosApi";

const orderFetchStart = () => {
  return {
    type: ORDER_FETCH_START,
  };
};

const orderFetchSuccess = (data) => {
  return {
    type: ORDER_FETCH_SUCCESS,
    data: data,
  };
};

const orderFetchError = () => {
  return {
    type: ORDER_FETCH_ERROR,
  };
};

const processImageUrl = (data) => {
  data.products.map((d, idx) => {
    const imgUrl = d.product_image_url;
    d.product_image_url = `${BASE_URL}${imgUrl.substring(1)}`;
    return d;
  });
  return data;
};

export const orderFetchThunkAction = (id) => {
  return (dispatch, getState) => {
    dispatch(orderFetchStart());
    axios
      .get(`order/${id}/`, {
        headers: {
          Authorization: "Token " + getState()._root._id,
        },
      })
      .then((res) => {
        processImageUrl(res.data);
        dispatch(orderFetchSuccess(res.data));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(orderFetchError());
      });
  };
};
