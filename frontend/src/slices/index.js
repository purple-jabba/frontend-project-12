import { configureStore } from '@reduxjs/toolkit';
import { channelsApi } from '../services/channelsApi.js';
import { messagesApi } from '../services/messagesApi.js';
import authSliceReducer from './authSlice.js';
import channelsSliceReducer from './channelsSlice.js';
import messagesSliceReducer from './messagesSlice.js';
import modalSliceReducer from './modalSlice.js';

export default configureStore({
  reducer: {
    auth: authSliceReducer,
    modal: modalSliceReducer,
    messages: messagesSliceReducer,
    channels: channelsSliceReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([channelsApi.middleware, messagesApi.middleware]),
});
