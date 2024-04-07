import { io } from 'socket.io-client';
import { createContext } from 'react';
import store from '../slices/index.js';
import { addNewMesage } from '../slices/messagesSlice';
import { addNewChannel, deleteChannel } from '../slices/channelsSlice.js';

export const socket = io();

export const WebSocketContext = createContext();

const { dispatch } = store;

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('newMessage', (payload) => {
  console.log(payload);
  dispatch(addNewMesage(payload));
});

socket.on('newChannel', (payload) => {
  console.log(payload);
  dispatch(addNewChannel(payload));
});

socket.on('removeChannel', (payload) => {
  console.log(payload);
  dispatch(deleteChannel(payload));
});
