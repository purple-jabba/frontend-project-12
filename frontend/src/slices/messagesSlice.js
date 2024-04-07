import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addNewMesage: (state, { payload }) => {
      state.push(payload);
    },
  },
});

export const { addNewMesage } = messagesSlice.actions;

export default messagesSlice.reducer;
