import { createSlice } from '@reduxjs/toolkit';

const parsedLocalStorage = JSON.parse(localStorage.getItem('userToken'));

const initialState = {
  token: !parsedLocalStorage ? null : parsedLocalStorage.token,
  username: !parsedLocalStorage ? null : parsedLocalStorage.username,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addLoginInfo: (state, { payload: { data } }) => {
      localStorage.setItem('userToken', JSON.stringify(data));
      state.token = data.token;
      state.username = data.username;
    },
    logOut: (state) => {
      localStorage.removeItem('userToken');
      state.token = null;
      state.username = null;
    },
  },
});

export const { addLoginInfo, logOut } = authSlice.actions;

export default authSlice.reducer;
