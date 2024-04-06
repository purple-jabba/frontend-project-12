import { io } from 'socket.io-client';
import { createContext } from 'react';

export const socket = io();

export const WebSocketContext = createContext();

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('newMessage', (payload) => {
  console.log(payload);
});

socket.on('newChannel', (payload) => {
  console.log(payload);
});
