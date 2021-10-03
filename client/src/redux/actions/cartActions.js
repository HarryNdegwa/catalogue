import {
  CART_PERSIST_START,
  CART_PERSISTED,
  CART_TO_DB_START,
  CART_SAVED_TO_DB,
  CART_TO_DB_STOP,
  DONE,
  FETCH_CART_COUNT,
  SAVE_UNAUTH_CART,
  FETCH_CART_START,
  FETCH_CART_STOP,
  CART_FETCHED,
  CART_INCREMENT_START,
  CART_INCREMENT_STOP,
  CART_INCREMENTED,
  CART_DECREMENT_START,
  CART_DECREMENT_STOP,
  CART_DECREMENTED,
  CART_DELETE,
} from "../actions/actionsType";
import axios from "../../axiosApi";
import { BASE_URL } from "../../axiosApi";
import { history } from "../../index";
import {
  _cartSavedToDb,
  _fetchCartCount,
  _cartDelete,
  processCartCurrencyPrice,
} from "./rootActions";

const persistCartStart = () => {
  return {
    type: CART_PERSIST_START,
  };
};

const cartPersisted = (data) => {
  return {
    type: CART_PERSISTED,
    data: data,
  };
};

const cartToDbStart = () => {
  return {
    type: CART_TO_DB_START,
  };
};

const cartSavedToDb = () => {
  return {
    type: CART_SAVED_TO_DB,
    // data: data,
  };
};

const cartToDbStop = () => {
  return {
    type: CART_TO_DB_STOP,
  };
};

const cartDone = () => {
  return {
    type: DONE,
  };
};

const fetchCartCount = (data) => {
  return {
    type: FETCH_CART_COUNT,
    data: data,
  };
};

const saveUnauthCart = () => {
  return {
    type: SAVE_UNAUTH_CART,
  };
};

export const cartFetchStart = () => {
  return {
    type: FETCH_CART_START,
  };
};

export const cartFetched = (data) => {
  return {
    type: CART_FETCHED,
    data: data,
  };
};

export const cartFetchStop = () => {
  return {
    type: FETCH_CART_STOP,
  };
};

const cartIncrementStart = () => {
  return {
    type: CART_INCREMENT_START,
  };
};

const cartIncremented = (data) => {
  return {
    type: CART_INCREMENTED,
    data: data,
  };
};

const cartIncrementStop = () => {
  return {
    type: CART_INCREMENT_STOP,
  };
};

const cartDecrementStart = () => {
  return {
    type: CART_DECREMENT_START,
  };
};

const cartDecremented = (data) => {
  return {
    type: CART_DECREMENTED,
    data: data,
  };
};

const cartDecrementStop = () => {
  return {
    type: CART_DECREMENT_STOP,
  };
};

const cartDelete = (data) => {
  return {
    type: CART_DELETE,
    data: data,
  };
};

export const saveUnauthCartActionCreator = (cart) => {
  return (dispatch, getState) => {
    axios
      .post("cart/", cart, {
        headers: {
          Authorization: "Token " + getState()._root._id,
        },
      })
      .then((res) => {
        dispatch(saveUnauthCart());
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const fetchCartCountThunkAction = () => {
  return (dispatch, getState) => {
    axios
      .get("cart/count/", {
        headers: {
          Authorization: "Token " + getState()._root._id,
        },
      })
      .then((res) => {
        dispatch(fetchCartCount());
        dispatch(_fetchCartCount(res.data));
      })
      .catch((error) => {
        console.log("Cart count error is ", error.response);
      });
  };
};

export const persistCartThunkAction = (data) => {
  return (dispatch, getState) => {
    dispatch(persistCartStart());
    const simulation = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Done");
      }, 1000);
    });
    simulation.then((msg) => {
      dispatch(cartPersisted(data));
    });
    setTimeout(() => {
      dispatch(cartDone());
    }, 5000);
  };
};

export const saveCartThunkAction = (data) => {
  return (dispatch, getState) => {
    dispatch(cartToDbStart());
    axios
      .post("cart/", data, {
        headers: {
          Authorization: "Token " + getState()._root._id,
        },
      })
      .then((res) => {
        dispatch(cartSavedToDb());
        dispatch(_cartSavedToDb(res.data));
        setTimeout(() => {
          dispatch(cartDone());
        }, 5000);
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(cartToDbStop());
      });
  };
};
const processImageUrl = (data) => {
  data.map((d, idx) => {
    const imgUrl = d.product_image_url;
    d.product_image_url = `${BASE_URL}${imgUrl.substring(1)}`;
    return d;
  });
  return data;
};

export const fetchCartThunkActionCreator = () => {
  return (dispatch, getState) => {
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
  };
};

export const incrementCartThunkActionCreator = (data) => {
  return (dispatch, getState) => {
    dispatch(cartIncrementStart());
    axios
      .put("cart/", data, {
        headers: {
          Authorization: "Token " + getState()._root._id,
        },
      })
      .then((res) => {
        dispatch(
          cartIncremented({
            id: res.data.id,
            totalPrice: res.data.total_price,
          })
        );
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(cartIncrementStop());
      });
  };
};

export const decrementCartThunkActionCreator = (data) => {
  return (dispatch, getState) => {
    dispatch(cartDecrementStart());
    axios
      .put("cart/", data, {
        headers: {
          Authorization: "Token " + getState()._root._id,
        },
      })
      .then((res) => {
        dispatch(
          cartDecremented({
            id: res.data.id,
            totalPrice: res.data.total_price,
          })
        );
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(cartDecrementStop());
      });
  };
};

export const deleteCartThunkActionCreator = (id, qty) => {
  return (dispatch, getState) => {
    axios
      .delete("cart/" + id + "/", {
        headers: {
          Authorization: "Token " + getState()._root._id,
        },
      })
      .then((res) => {
        dispatch(cartDelete(res.data));
        dispatch(_cartDelete({ qty: qty }));
        const cart = getState().cartReducer.cart;
        if (cart.length === 0) {
          history.push("/empty-cart");
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};
