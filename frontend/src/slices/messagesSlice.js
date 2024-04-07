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
  },
});

export const { addNewMesage, clearMessageHistory } = messagesSlice.actions;

export default messagesSlice.reducer;
