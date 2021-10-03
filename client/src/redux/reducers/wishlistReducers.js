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

const initialState = {
  fetchingWishlist: false,
  items: [],
  wishListCount: 0,
  wishlist: null,
};

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WISHLIST_START:
      return { ...state, fetchingWishlist: true };
    case WISHLIST_FETCHED:
      return { ...state, fetchingWishlist: false, wishlist: action.data };
    case FETCH_WISHLIST_STOP:
      return { ...state, fetchingWishlist: false };
    case PERSIST_WISHLIST:
      return {
        ...state,
        items: [...state.items, ...action.data],
        wishListCount: state.wishListCount + 1,
      };
    case FETCH_WISHLIST_COUNT:
      return { ...state, wishListCount: action.data.count };
    case SAVED_WISHLIST:
      return { ...state, wishListCount: action.data.count };
    case WISHLIST_DELETE:
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => {
          return item.id !== action.data.id;
        }),
        wishListCount: state.wishListCount - 1,
      };
    case WISHLIST_ZERO:
      return { ...state, wishListCount: 0 };
    default:
      return state;
  }
};
