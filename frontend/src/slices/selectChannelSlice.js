import { createSlice } from '@reduxjs/toolkit';

const defaultChannelId = 1;
const defaultChannelName = 'general';

const selectChannelSlice = createSlice({
  name: 'selectedChannel',
  initialState: { currentChannelId: defaultChannelId, currentChannelName: defaultChannelName },
  reducers: {
    selectCurrentChannel: (state, { payload: data }) => {
      state.currentChannelId = Number(data.id);
      state.currentChannelName = data.name;
    },
    selectDefaultChannel: (state) => {
      state.currentChannelId = defaultChannelId;
      state.currentChannelName = defaultChannelName;
    },
  },
});

export const { selectCurrentChannel, selectDefaultChannel } = selectChannelSlice.actions;

export default selectChannelSlice.reducer;
