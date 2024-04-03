import { io } from 'socket.io-client';

const socket = io();

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('newMessage', (payload) => {
  console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
});
