import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addNewChannel: (state, { payload }) => {
      state.push(payload);
    },
  },
});

export const { addNewChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
