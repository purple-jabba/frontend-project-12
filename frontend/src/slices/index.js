import { configureStore } from '@reduxjs/toolkit';
import { channelsApi } from '../services/channelsApi.js';
import { messagesApi } from '../services/messagesApi.js';
import authSliceReducer from './authSlice.js';
import channelsSliceReducer from './channelsSlice.js';
import modalSliceReducer from './modalSlice.js';

export default configureStore({
  reducer: {
    auth: authSliceReducer,
    selectedChannel: channelsSliceReducer,
    modal: modalSliceReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([channelsApi.middleware, messagesApi.middleware]),
});
