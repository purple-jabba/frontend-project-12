import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addNewMesage: (state, { payload }) => {
      state.push(payload);
    },
    clearMessageHistory: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { addNewMesage, clearMessageHistory } = messagesSlice.actions;

export default messagesSlice.reducer;
