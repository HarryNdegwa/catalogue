import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";

import authReducer from "./AuthReducers";
import { cartReducer } from "./cartReducer";
import { checkoutDetailsReducer } from "./checkoutReducers";
import { productPublishReducer } from "./ProductPublishReducers";
import { productReducer } from "./productReducer";
import { productsReducer } from "./ProductsReducer";
import { wishlistReducer } from "./wishlistReducers";
import { rootReducer } from "./rootReducers";
import { dealReducer } from "./dealReducers";
import { contactReducer } from "./contactReducer";
import { accountReducer } from "./accountReducers";
import { reviewsReducer } from "./reviewsReducer";
import { paymentReducer } from "./paymentReducers";
import { ordersReducer } from "./ordersReducer";
import { orderReducer } from "./orderReducers";
import { reviewReducer } from "./reviewReducer";

const persistConfig = {
  key: "root",
  storage: storageSession,
  blacklist: [
    "productReducer",
    "authReducer",
    "productsReducer",
    "checkoutDetailsReducer",
    "wishlistReducer",
    "cartReducer",
    "dealReducer",
    "contactReducer",
    "accountReducer",
    "reviewsReducer",
    "paymentReducer",
    "ordersReducer",
    "orderReducer",
    "reviewReducer",
  ],
};

const root = combineReducers({
  authReducer: authReducer,
  productPublishReducer: productPublishReducer,
  productReducer: productReducer,
  productsReducer: productsReducer,
  cartReducer: cartReducer,
  checkoutDetailsReducer: checkoutDetailsReducer,
  wishlistReducer: wishlistReducer,
  contactReducer: contactReducer,
  accountReducer: accountReducer,
  _root: rootReducer,
  dealReducer: dealReducer,
  reviewsReducer: reviewsReducer,
  paymentReducer: paymentReducer,
  ordersReducer: ordersReducer,
  orderReducer: orderReducer,
  reviewReducer: reviewReducer,
});

export default persistReducer(persistConfig, root);
