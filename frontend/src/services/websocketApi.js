import { io } from 'socket.io-client';

const socket = io();

socket.on('connect', () => {
  console.log('connected to server');
});
