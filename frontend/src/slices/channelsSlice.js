/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { primaryData: [], data: [] },
  reducers: {
    addNewChannel: (state, { payload }) => {
      state.data.push(payload);
    },
    clearChannelHistory: (state) => {
      state.data = [];
      state.primaryData = [];
    },
    deleteChannel: (state, { payload }) => {
      state.data = state.data.filter((channel) => channel.id !== payload.id);
    },
    renameChannel: (state, { payload }) => {
      state.primaryData = state.primaryData.map((channel) => {
        if (channel.id === payload.id) {
          return payload;
        }
        return channel;
      });
      state.data = state.data.map((channel) => {
        if (channel.id === payload.id) {
          return payload;
        }
        return channel;
      });
    },
    addPrimaryData: (state, { payload }) => {
      state.primaryData = [...payload];
    },
  },
});

export const {
  addNewChannel, addPrimaryData, clearChannelHistory, deleteChannel, renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
