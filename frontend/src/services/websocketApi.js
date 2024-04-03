import { io } from 'socket.io-client';

const socket = io();

socket.on('newMessage', (payload) => {
  console.log(`New message: '${payload.body}' from user ${payload.username}`); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
});
