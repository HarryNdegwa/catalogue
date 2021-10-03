import {
  FETCH_WISHLIST_START,
  WISHLIST_FETCHED,
  FETCH_WISHLIST_STOP,
  PERSIST_WISHLIST,
  FETCH_WISHLIST_COUNT,
  SAVED_WISHLIST,
  WISHLIST_DELETE,
  WISHLIST_ZERO,
} from "../actions/actionsType";
import axios from "../../axiosApi";
import { processWishlistCurrencyPrice } from "../actions/rootActions";

export const wishlistFetchStart = () => {
  return {
    type: FETCH_WISHLIST_START,
  };
};

export const wishlistFetched = (data) => {
  return {
    type: WISHLIST_FETCHED,
    data: data,
  };
};

export const wishlistFetchStop = () => {
  return {
    type: FETCH_WISHLIST_STOP,
  };
};

const savedWishlist = (data) => {
  return {
    type: SAVED_WISHLIST,
    data: data,
  };
};

export const persistWishList = (data) => {
  return { type: PERSIST_WISHLIST, data: data };
};

export const fetchWishlistCount = (data) => {
  return { type: FETCH_WISHLIST_COUNT, data: data };
};

export const wishlistDelete = (data) => {
  return {
    type: WISHLIST_DELETE,
    data: data,
  };
};

export const wishListZero = () => {
  return {
    type: WISHLIST_ZERO,
  };
};

export const wishlistFetchThunkActionCreator = () => {
  return (dispatch, getState) => {
    dispatch(wishlistFetchStart());
    axios
      .get("wishlist/", {
        headers: {
          Authorization: "Token " + getState()._root._id,
          CURRENCY: getState()._root.cur,
        },
      })
      .then((res) => {
        processWishlistCurrencyPrice(res.data, res.headers["currency"]);
        dispatch(wishlistFetched(res.data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(wishlistFetchStop());
      });
  };
};

export const saveWishlistThunkAction = (data) => {
  return (dispatch, getState) => {
    axios
      .post("wishlist/", data, {
        headers: {
          Authorization: "Token " + getState()._root._id,
        },
      })
      .then((res) => {
        // console.log(res.data);
        dispatch(savedWishlist(res.data));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const fetchWishListCountThunkAction = () => {
  return (dispatch, getState) => {
    axios
      .get("wishlist/count/", {
        headers: {
          Authorization: "Token " + getState()._root._id,
        },
      })
      .then((res) => {
        dispatch(fetchWishlistCount(res.data));
      })
      .catch((error) => {
        console.log("Error is ", error.response);
      });
  };
};
