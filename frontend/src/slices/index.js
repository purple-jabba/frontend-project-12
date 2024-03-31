import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './authSlice.js';

export default configureStore({
  reducer: {
    auth: authSliceReducer,
  },
});
