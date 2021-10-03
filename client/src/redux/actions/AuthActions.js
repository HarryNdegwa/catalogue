import {
  LOGIN_LOADING,
  _LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from "./actionsType";
import axios from "../../axiosApi";
import { history } from "../../index";
import { store } from "../store";
import {
  saveUnauthCartActionCreator,
  fetchCartCountThunkAction,
} from "../actions/cartActions";
import {
  saveWishlistThunkAction,
  fetchWishListCountThunkAction,
} from "../actions/wishlistActions";
import { _loginSuccess } from "../actions/rootActions";

const loginLoad = () => {
  return {
    type: LOGIN_LOADING,
  };
};

const loginSuccess = () => {
  return {
    type: _LOGIN_SUCCESS,
  };
};

const loginFail = (error) => {
  return {
    type: LOGIN_FAIL,
    data: error,
  };
};

export const loginThunkActionCreator = (userData) => {
  store.dispatch(loginLoad());
  return (dispatch, getState) => {
    return axios
      .post("login/", userData)
      .then((res) => {
        const data = res.data;
        dispatch(_loginSuccess({ ...data }));
        const cartItems = getState()._root.pc;
        if (cartItems.length >= 1) {
          dispatch(saveUnauthCartActionCreator(cartItems));
          getState()._root.pc = [];
        }
        const wishlistItems = getState().wishlistReducer.items;

        if (wishlistItems.length >= 1) {
          dispatch(saveWishlistThunkAction(wishlistItems));
          getState().wishlistReducer.items = [];
        }

        dispatch(fetchCartCountThunkAction());
        dispatch(fetchWishListCountThunkAction());
        dispatch(loginSuccess());
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          if (
            error.response.data.detail ===
            "No active account found with the given credentials"
          ) {
            dispatch(loginFail("Invalid Email or Password!"));
          } else {
            dispatch(loginFail(""));
          }
        }
      });
  };
};

const registerLoading = () => {
  return {
    type: REGISTER_LOADING,
  };
};

const registerSuccess = () => {
  return { type: REGISTER_SUCCESS };
};

const registerError = (error) => {
  return { type: REGISTER_ERROR, data: error };
};

export const registerThunkActionCreator = (data) => {
  store.dispatch(registerLoading());
  return (dispatch, getState) => {
    return axios
      .post("user/create/", data)
      .then((res) => {
        if (res.statusText === "Created") {
          dispatch(registerSuccess());
          history.push("/login");
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(registerError("User with this email already exists!"));
      });
  };
};
