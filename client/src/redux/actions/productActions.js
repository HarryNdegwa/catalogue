import {
  START_PRODUCT_FETCH,
  FETCHED_PRODUCT,
  STOP_PRODUCT_FETCH,
} from "./actionsType";
import axios from "../../axiosApi";
import { BASE_URL } from "../../axiosApi";
import { processProductCurrencyPrice } from "./rootActions";

export const startProductFetch = () => {
  return {
    type: START_PRODUCT_FETCH,
  };
};

export const fetchedProduct = (data) => {
  return {
    type: FETCHED_PRODUCT,
    data: data,
  };
};

export const stopProductFetch = () => {
  return {
    type: STOP_PRODUCT_FETCH,
  };
};

let processImageUrls = (data) => {
  const imgUrls = data.img_urls.split(",");
  let newImgUrls = imgUrls.map((url, idx) => {
    return `${BASE_URL}${url.substring(1)}`;
  });
  data.img_urls = newImgUrls;
  return data;
};

export const productFetchThunkActionCreator = (slug) => {
  return (dispatch, getState) => {
    getState().productReducer.product = null;
    dispatch(startProductFetch());

    axios
      .get("product/" + slug + "/", {
        headers: { CURRENCY: getState()._root.cur },
      })
      .then((res) => {
        processImageUrls(res.data);
        processProductCurrencyPrice(res.data, res.headers["currency"]);
        dispatch(fetchedProduct(res.data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(stopProductFetch());
      });
  };
};
