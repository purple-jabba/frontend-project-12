import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addNewChannel: (state, { payload }) => {
      state.push(payload);
    },
    clearChannelHistory: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { addNewChannel, clearChannelHistory } = channelsSlice.actions;

export default channelsSlice.reducer;
