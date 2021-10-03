import React from "react";
import ReactDom from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import "./index.css";
import App from "./components/App";
import { store } from "./redux/store";
import ScrollTop from "./ScrollTop";

export const history = createBrowserHistory();

ReactDom.render(
  <Provider store={store}>
    <Router history={history}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <ScrollTop />
        <App />
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById("root")
);
