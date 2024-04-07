import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getPath from '../routes.js';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({ baseUrl: getPath.channelsPath() }),
  tagTypes: ['Channel'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: (token) => ({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        providesTags: ['Channel'],
      }),
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        method: 'POST',
        body: newChannel.body,
        headers: {
          Authorization: `Bearer ${newChannel.token}`,
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
      invalidatesTags: ['Channel'],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
