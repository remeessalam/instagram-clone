import { configureStore } from "@reduxjs/toolkit";
import app from "./slices/appSlice";
import userSlice from "./slices/userSlice";
import modalSlice from "./slices/modalslice";

export const store = configureStore({
  reducer: {
    app: app,
    user: userSlice,
    modal: modalSlice,
  },
});
