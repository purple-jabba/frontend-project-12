/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { data: [] },
  reducers: {
    addNewMesage: (state, { payload }) => {
      state.data.push(payload);
    },
    clearMessageHistory: (state) => {
      state.data = [];
    },
    addMessageData: (state, { payload }) => {
      state.data = [...payload];
    },
  },
});

export const { addNewMesage, clearMessageHistory, addMessageData } = messagesSlice.actions;

export default messagesSlice.reducer;
