import { io } from 'socket.io-client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getPath from '../routes.js';

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({ baseUrl: getPath.messagesPath() }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (token) => ({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        method: 'POST',
        body: newMessage.message,
        headers: {
          Authorization: `Bearer ${newMessage.token}`,
        },
      }),
    }),
    editMessage: builder.mutation({
      query: (id, editedMessage, token) => ({
        url: id,
        method: 'PATCH',
        body: editedMessage,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    removeMessage: builder.mutation({
      query: (id, token) => ({
        url: id,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

const socket = io();

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('newMessage', (payload) => {
  console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
  useRemoveMessageMutation,
} = messagesApi;
