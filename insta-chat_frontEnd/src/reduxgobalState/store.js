import { configureStore } from '@reduxjs/toolkit'
import refreshSlice from './rerenderSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    refresh: refreshSlice,
    user: userSlice
  },
})