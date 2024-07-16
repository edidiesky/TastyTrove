import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "react-loading-skeleton/dist/skeleton.css";
import { Provider } from "react-redux";
import { store } from "./store";
import SmoothScroll from "./constants/utils/SmoothScroll";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster
        style={{
          boxShadow: "0 2px 10px rgba(0,0,0,.1)",
          width: "400px",
        }}
      />
      <BrowserRouter>
        <SmoothScroll>
          <App />
        </SmoothScroll>
      </BrowserRouter>
    </Provider>
    ,
  </React.StrictMode>
);

//
