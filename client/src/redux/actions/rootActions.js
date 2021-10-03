import {
  LOGIN_SUCCESS,
  LOGOUT,
  PERSIST_SLUG,
  _FETCH_CART_COUNT,
  CART_PERSISTED,
  CART_INCREMENTED,
  CART_DECREMENTED,
  _CART_SAVED_TO_DB,
  _CART_DELETE,
  USER,
  SET_CURRENCY,
  UNAUTH,
} from "./actionsType";
import { BASE_URL } from "../../axiosApi";

import axios from "../../axiosApi";
import {
  startProductsFetch,
  productsFetched,
  stopProductsFetch,
  setProductsToNull,
  fetchCategoryStart,
  categoryFetched,
  fetchCategoryStop,
  searchSuccess,
  searchBadRequest,
  searchError,
  searchStart,
} from "./productsActions";
import { cartFetchStart, cartFetched, cartFetchStop } from "./cartActions";
import {
  startProductFetch,
  fetchedProduct,
  stopProductFetch,
} from "./productActions";
import {
  wishlistFetchStart,
  wishlistFetched,
  wishlistFetchStop,
} from "../../redux/actions/wishlistActions";
import { PERSIST_ORDER_ID } from "../../redux/actions/actionsType";

export const _loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data: data,
  };
};

const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const persistSlug = (data) => {
  return {
    type: PERSIST_SLUG,
    data: data,
  };
};

export const cartPersisted = (data) => {
  return {
    type: CART_PERSISTED,
    data: data,
  };
};

export const _fetchCartCount = (data) => {
  return {
    type: _FETCH_CART_COUNT,
    data: data,
  };
};

export const _cartSavedToDb = (data) => {
  return {
    type: _CART_SAVED_TO_DB,
    data: data,
  };
};

export const _cartIncremented = (data) => {
  return {
    type: CART_INCREMENTED,
    data: data,
  };
};

export const _cartDecremented = (data) => {
  return {
    type: CART_DECREMENTED,
    data: data,
  };
};

export const _cartDelete = (data) => {
  return {
    type: _CART_DELETE,
    data: data,
  };
};

export const persistOrderId = (id) => {
  return {
    type: PERSIST_ORDER_ID,
    data: id,
  };
};

export const unAuth = () => {
  return {
    type: UNAUTH,
  };
};

export const user = (data) => {
  return { type: USER, data: data };
};

const setCurrency = (data) => {
  return { type: SET_CURRENCY, data: data };
};

export const logoutThunkAction = () => {
  return (dispatch) => {
    dispatch(logout());
    localStorage.removeItem("_identity_");
  };
};

const processImageUrls = (data) => {
  data.map((d) => {
    const imgUrls = d.img_urls.split(",");
    let newImgUrls = imgUrls.map((url) => {
      return `${BASE_URL}${url.substring(1)}`;
    });
    d.img_urls = newImgUrls;
    return d;
  });
  return data;
};

const processImageUrl = (data) => {
  data.map((d, idx) => {
    const imgUrl = d.product_image_url;
    d.product_image_url = `${BASE_URL}${imgUrl.substring(1)}`;
    return d;
  });
  return data;
};

const processProductImageUrls = (data) => {
  const imgUrls = data.img_urls.split(",");
  let newImgUrls = imgUrls.map((url, idx) => {
    return `${BASE_URL}${url.substring(1)}`;
  });
  data.img_urls = newImgUrls;
  return data;
};

export const processProductCurrencyPrice = (data, currency) => {
  data.price = Math.round(data.price * currency);
  data.prev_price = Math.round(data.prev_price * currency);
  data.deal_price = Math.round(data.deal_price * currency);
  return data;
};

export const processCurrencyPrice = (data, currency) => {
  data.map((d) => {
    d.price = Math.round(d.price * currency);
    d.prev_price = Math.round(d.prev_price * currency);
    d.deal_price = Math.round(d.deal_price * currency);
    return d;
  });
  return data;
};

export const processWishlistCurrencyPrice = (data, currency) => {
  data.map((d) => {
    d.product.price = Math.round(d.product.price * currency);
    d.product.prev_price = Math.round(d.product.prev_price * currency);
    d.product.deal_price = Math.round(d.product.deal_price * currency);
    return d;
  });
  return data;
};

export const processCartCurrencyPrice = (data, currency) => {
  data.map((d) => {
    d.total_price = Math.round(d.total_price * currency);
    return d;
  });
  return data;
};

export const setCurrencyThunkAction = (cur) => {
  return (dispatch, getState) => {
    const path = window.location.pathname;

    dispatch(setCurrency(cur));
    switch (path) {
      case "/":
        dispatch(setProductsToNull());
        dispatch(startProductsFetch());
        getState().productsReducer.prev = null;
        getState().productsReducer.next = null;

        axios
          .get(`${BASE_URL}products/`, { headers: { CURRENCY: cur } })
          .then((res) => {
            processImageUrls(res.data.results);
            processCurrencyPrice(res.data.results, res.headers["currency"]);
            dispatch(productsFetched(res.data));
          })
          .catch((error) => {
            console.log(error.response);
            dispatch(stopProductsFetch());
          });
        return;
      case "/laptops":
        getState().productsReducer.products = null;
        getState().productsReducer.prev = null;
        getState().productsReducer.next = null;
        dispatch(fetchCategoryStart());
        axios
          .get("products/" + getState().productsReducer.currCategory + "/", {
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
        return;
      case "/smartphones":
        getState().productsReducer.products = null;
        getState().productsReducer.prev = null;
        getState().productsReducer.next = null;
        dispatch(fetchCategoryStart());
        axios
          .get("products/" + getState().productsReducer.currCategory + "/", {
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
        return;
      case "/accessories":
        getState().productsReducer.products = null;
        getState().productsReducer.prev = null;
        getState().productsReducer.next = null;
        dispatch(fetchCategoryStart());
        axios
          .get("products/" + getState().productsReducer.currCategory + "/", {
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
        return;
      case "/cart":
        dispatch(cartFetchStart());
        axios
          .get("cart/", {
            headers: {
              Authorization: "Token " + getState()._root._id,
              CURRENCY: getState()._root.cur,
            },
          })
          .then((res) => {
            processImageUrl(res.data);
            processCartCurrencyPrice(res.data, res.headers["currency"]);
            dispatch(cartFetched(res.data));
          })
          .catch((error) => {
            console.log(error.response);
            dispatch(cartFetchStop());
          });
        return;
      case `/main-product/${getState()._root.slg}`:
        getState().productReducer.product = null;
        dispatch(startProductFetch());
        axios
          .get("product/" + getState()._root.slg + "/", {
            headers: { CURRENCY: getState()._root.cur },
          })
          .then((res) => {
            processProductImageUrls(res.data);
            processProductCurrencyPrice(res.data, res.headers["currency"]);
            dispatch(fetchedProduct(res.data));
          })
          .catch((error) => {
            console.log(error.response);
            dispatch(stopProductFetch());
          });
        return;
      case "/search":
        getState().productsReducer.products = null;
        getState().productsReducer.prev = null;
        getState().productsReducer.next = null;
        dispatch(searchStart());

        axios
          .get("/search/", {
            params: { search: sessionStorage.getItem("searchTerms") },
            headers: { CURRENCY: cur },
          })
          .then((res) => {
            if (res.data.results) {
              processImageUrls(res.data.results);
              processCurrencyPrice(res.data.results, res.headers["currency"]);
            }
            dispatch(searchSuccess(res.data));
            if (sessionStorage.getItem("searchRefresh") === true) {
              sessionStorage.setItem("searchRefresh", false);
            }
          })
          .catch((error) => {
            console.log(error.response);
            if (error.response.status === 400) {
              dispatch(searchBadRequest());
            }
            dispatch(searchError());
          });
        return;
      case "/wishlist":
        getState().wishlistReducer.wishlist = null;
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
        return;

      default:
        return;
    }
  };
};
