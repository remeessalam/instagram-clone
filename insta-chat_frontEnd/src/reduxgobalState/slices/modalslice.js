import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    openModalState: false,
  },
  reducers: {
    openModal: (state, action) => {
      state.openModalState = true;
    },
    closeModal: (state, action) => {
      state.openModalState = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
