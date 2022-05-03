import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./styles/common.css";
import App from "./App";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./modules";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import ScrollToTop from "./components/common/ScrollToTop";

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
