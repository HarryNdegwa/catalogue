import {
  LOGIN_SUCCESS,
  LOGOUT,
  PERSIST_SLUG,
  CART_PERSISTED,
  _FETCH_CART_COUNT,
  CART_INCREMENTED,
  CART_DECREMENTED,
  _CART_SAVED_TO_DB,
  _CART_DELETE,
  SET_CURRENCY,
  UNAUTH,
  USER,
  PERSIST_ORDER_ID,
} from "../actions/actionsType";

const initialState = {
  lvl: 0,
  slg: "",
  pc: [],
  cc: 0,
  cur: "KSH",
  _id: null,
  o_id: null,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, lvl: action.data.lvl, _id: action.data.token };
    case LOGOUT:
      return { ...state, lvl: 0, cc: 0, _id: null };
    case PERSIST_SLUG:
      return { ...state, slg: action.data };
    case CART_PERSISTED:
      return {
        ...state,
        pc: state.pc.concat(action.data),
      };
    case _FETCH_CART_COUNT:
      return { ...state, cc: parseInt(action.data.count) };
    case _CART_SAVED_TO_DB:
      return {
        ...state,
        cc: state.cc + parseInt(action.data.count),
      };
    case CART_INCREMENTED:
      return {
        ...state,
        cc: state.cc + 1,
      };

    case CART_DECREMENTED:
      return {
        ...state,
        cc: state.cc - 1,
      };
    case _CART_DELETE:
      return {
        ...state,
        cc: state.cc - action.data.qty,
      };
    case UNAUTH:
      return { ...state, lvl: 0, cc: 0 };
    case USER:
      return { ...state, lvl: action.data.level };

    case SET_CURRENCY:
      return { ...state, cur: action.data };
    case PERSIST_ORDER_ID:
      return { ...state, o_id: action.data };
    default:
      return state;
  }
};
