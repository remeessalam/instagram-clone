import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./App";
import { Provider } from "react-redux";
import { store } from "./reduxgobalState/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="117584395273-oljruplarl1md005un2cv7rmkvf11so6.apps.googleusercontent.com">
      <RouterProvider router={appRouter} />
    </GoogleOAuthProvider>
  </Provider>
);
