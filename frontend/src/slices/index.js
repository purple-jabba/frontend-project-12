import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './authSlice.js';
import channelsSliceReducer from './channelsSlice.js';

export default configureStore({
  reducer: {
    auth: authSliceReducer,
    channelsInfo: channelsSliceReducer,
  },
});
