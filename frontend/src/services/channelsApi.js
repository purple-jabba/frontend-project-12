import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getPath from '../routes.js';

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({ baseUrl: getPath.channelsPath() }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: (token) => ({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addChannel: builder.mutation({
      query: (newChannel, token) => ({
        method: 'POST',
        body: newChannel,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    editChannel: builder.mutation({
      query: (id, editedChannel, token) => ({
        url: id,
        method: 'PATCH',
        body: editedChannel,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    removeChannel: builder.mutation({
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
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
