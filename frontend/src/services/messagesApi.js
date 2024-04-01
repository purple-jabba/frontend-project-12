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
      query: (newMessage, token) => ({
        method: 'POST',
        body: newMessage,
        headers: {
          Authorization: `Bearer ${token}`,
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

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
  useRemoveMessageMutation,
} = messagesApi;
