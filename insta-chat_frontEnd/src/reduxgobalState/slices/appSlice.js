import { createSlice } from "@reduxjs/toolkit";

export const app = createSlice({
  name: "app",
  initialState: {
    refresh: false,
  },
  reducers: {
    refreshReducer: (state, action) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { refreshReducer } = app.actions;

export default app.reducer;
