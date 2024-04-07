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
  },
});

export const { addNewChannel, clearChannelHistory, deleteChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
