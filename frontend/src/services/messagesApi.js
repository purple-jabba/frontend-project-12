import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getPath from '../routes.js';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getPath.messagesPath(),
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const { token } = state.auth;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Channel'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        method: 'GET',
      }),
      providesTags: ['Channel'],
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        method: 'POST',
        body: newMessage.message,
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
