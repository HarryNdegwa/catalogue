import {
  CART_PERSIST_START,
  CART_PERSISTED,
  CART_TO_DB_START,
  CART_SAVED_TO_DB,
  CART_TO_DB_STOP,
  DONE,
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

const initialState = {
  persistingCart: false,
  savingCart: false,
  done: false,
  fetchingCart: false,
  cart: null,
  cartIncrementing: false,
  cartDecrementing: false,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_PERSIST_START:
      return { ...state, persistingCart: true };
    case CART_PERSISTED:
      return {
        ...state,
        // items: state.items.concat(action.data),
        persistingCart: false,
        done: true,
      };
    case CART_TO_DB_START:
      return { ...state, savingCart: true };
    case CART_SAVED_TO_DB:
      return {
        ...state,
        savingCart: false,
        done: true,
      };
    case CART_TO_DB_STOP:
      return { ...state, savingCart: false };
    case DONE:
      return { ...state, done: false };

    case SAVE_UNAUTH_CART:
      return state;
    case FETCH_CART_START:
      return { ...state, fetchingCart: true };
    case CART_FETCHED:
      return { ...state, fetchingCart: false, cart: action.data };
    case FETCH_CART_STOP:
      return { ...state, fetchingCart: false };
    case CART_INCREMENT_START:
      return { ...state, cartIncrementing: true };
    case CART_INCREMENTED:
      return {
        ...state,
        cartIncrementing: false,
        // // cartCount: state.cartCount + parseInt(action.data.change),
        // cart: state.cart.map((item, idx) => {
        //   if (item.id === action.data.id) {
        //     item.quantity = action.data.quantity;
        //     item.total_price = action.data.totalPrice;
        //   }
        //   return item;
        // }),
      };
    case CART_INCREMENT_STOP:
      return { ...state, cartIncrementing: false };
    case CART_DECREMENT_START:
      return { ...state, cartDecrementing: true };
    case CART_DECREMENTED:
      return {
        ...state,
        cartDecrementing: false,
        // // cartCount: state.cartCount + parseInt(action.data.change),
        // cart: state.cart.map((item, idx) => {
        //   if (item.id === action.data.id) {
        //     item.quantity = action.data.quantity;
        //     item.total_price = action.data.totalPrice;
        //   }
        //   return item;
        // }),
      };
    case CART_DECREMENT_STOP:
      return { ...state, cartDecrementing: false };
    case CART_DELETE:
      return {
        ...state,
        // // cartCount: state.cartCount - action.data.qty,
        cart: state.cart.filter((item) => {
          return item.id !== action.data.id;
        }),
      };
    default:
      return state;
  }
};
