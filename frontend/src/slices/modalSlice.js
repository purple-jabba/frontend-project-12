/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const selectModalSlice = createSlice({
  name: 'selectedModal',
  initialState: { isOpen: false, type: null, id: null },
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpen = true;
      state.type = payload.type;
      state.id = payload.id ?? null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.id = null;
    },
  },
});

export const { openModal, closeModal } = selectModalSlice.actions;

export default selectModalSlice.reducer;
