/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { data: [] },
  reducers: {
    addNewChannel: (state, { payload }) => {
      state.data.push(payload);
    },
    clearChannelHistory: (state) => {
      state.data = [];
    },
    deleteChannel: (state, { payload }) => {
      state.data = state.data.filter((channel) => channel.id !== payload.id);
    },
    renameChannel: (state, { payload }) => {
      state.data = state.data.map((channel) => {
        if (channel.id === payload.id) {
          return payload;
        }
        return channel;
      });
    },
  },
});

export const {
  addNewChannel, clearChannelHistory, deleteChannel, renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
