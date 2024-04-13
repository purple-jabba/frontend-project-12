/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const defaultChannelId = 1;
const defaultChannelName = 'general';

const initialState = {
  data: [],
  selectedChannel: {
    currentChannelId: defaultChannelId,
    currentChannelName: defaultChannelName,
  },
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
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
    addChannelData: (state, { payload }) => {
      state.data = [...payload];
    },
    selectCurrentChannel: (state, { payload: data }) => {
      state.selectedChannel.currentChannelId = Number(data.id);
      state.selectedChannel.currentChannelName = data.name;
    },
    selectDefaultChannel: (state) => {
      state.selectedChannel.currentChannelId = defaultChannelId;
      state.selectedChannel.currentChannelName = defaultChannelName;
    },
  },
});

export const {
  addNewChannel,
  addChannelData,
  clearChannelHistory,
  deleteChannel,
  renameChannel,
  selectCurrentChannel,
  selectDefaultChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
