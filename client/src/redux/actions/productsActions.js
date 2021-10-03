import {
  START_PRODUCTS_FETCH,
  FETCHED_PRODUCTS,
  STOP_PRODUCTS_FETCH,
  FETCH_CATEGORY_START,
  FETCH_CATEGORY_STOP,
  CATEGORY_FETCHED,
  PRODUCTS_NULL,
  SET_CATEGORY,
  SEARCH_PRODUCTS_START,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_ERROR,
  SEARCH_BAD_REQUEST,
} from "./actionsType";
import axios from "../../axiosApi";
import { BASE_URL } from "../../axiosApi";
import { history } from "../../index";
import { processCurrencyPrice } from "./rootActions";

export const startProductsFetch = () => {
  return {
    type: START_PRODUCTS_FETCH,
  };
};

export const productsFetched = (data) => {
  return {
    type: FETCHED_PRODUCTS,
    data: data,
  };
};

export const stopProductsFetch = () => {
  return {
    type: STOP_PRODUCTS_FETCH,
  };
};

export const fetchCategoryStart = () => {
  return {
    type: FETCH_CATEGORY_START,
  };
};

export const categoryFetched = (data) => {
  return {
    type: CATEGORY_FETCHED,
    data: data,
  };
};

export const fetchCategoryStop = () => {
  return {
    type: FETCH_CATEGORY_STOP,
  };
};

export const setCategory = (data) => {
  return {
    type: SET_CATEGORY,
    data: data,
  };
};

export const setProductsToNull = () => {
  return { type: PRODUCTS_NULL };
};

export const searchStart = () => {
  return {
    type: SEARCH_PRODUCTS_START,
  };
};

export const searchSuccess = (data) => {
  return {
    type: SEARCH_PRODUCTS_SUCCESS,
    data: data,
  };
};

export const searchError = () => {
  return {
    type: SEARCH_PRODUCTS_ERROR,
  };
};

export const searchBadRequest = () => {
  return {
    type: SEARCH_BAD_REQUEST,
  };
};

let processImageUrls = (data) => {
  data.map((d, idx) => {
    const imgUrls = d.img_urls.split(",");
    let newImgUrls = imgUrls.map((url, idx) => {
      return `${BASE_URL}${url.substring(1)}`;
    });
    d.img_urls = newImgUrls;
    return d;
  });
  return data;
};

export const fetchProductsThunkActionCreator = (url) => {
  return (dispatch, getState) => {
    getState().productsReducer.products = null;
    getState().productsReducer.prev = null;
    getState().productsReducer.next = null;
    dispatch(startProductsFetch());

    axios
      .get(url, { headers: { CURRENCY: getState()._root.cur } })
      .then((res) => {
        processImageUrls(res.data.results);
        processCurrencyPrice(res.data.results, res.headers["currency"]);
        dispatch(productsFetched(res.data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(stopProductsFetch());
      });
  };
};

export const fetchSearchProductsThunkActionCreator = (data) => {
  return (dispatch, getState) => {
    getState().productsReducer.products = null;
    getState().productsReducer.prev = null;
    getState().productsReducer.next = null;
    dispatch(searchStart());

    axios
      .get("/search/", {
        params: data,
        headers: { CURRENCY: getState()._root.cur },
      })
      .then((res) => {
        if (res.data.results) {
          processImageUrls(res.data.results);
          processCurrencyPrice(res.data.results, res.headers["currency"]);
        }
        dispatch(searchSuccess(res.data));
        history.push("/search");
        if (sessionStorage.getItem("searchRefresh") === true) {
          sessionStorage.setItem("searchRefresh", false);
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 400) {
          dispatch(searchBadRequest());
          history.push("/search");
        }
        dispatch(searchError());
      });
  };
};

export const fetchProductsCategoryThunkActionCreator = (category) => {
  return (dispatch, getState) => {
    getState().productsReducer.products = null;
    getState().productsReducer.prev = null;
    getState().productsReducer.next = null;
    dispatch(fetchCategoryStart());
    axios
      .get("products/" + category + "/", {
        headers: { CURRENCY: getState()._root.cur },
      })
      .then((res) => {
        processImageUrls(res.data.results);
        processCurrencyPrice(res.data.results, res.headers["currency"]);
        dispatch(categoryFetched(res.data.results));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(fetchCategoryStop());
      });
  };
};
