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
      }),
      providesTags: ['Channel'],
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
      query: (channel) => ({
        url: channel.id,
        method: 'PATCH',
        body: channel.body,
        headers: {
          Authorization: `Bearer ${channel.token}`,
        },
      }),
      invalidatesTags: ['Channel'],
    }),
    removeChannel: builder.mutation({
      query: (channel) => ({
        url: channel.id,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${channel.token}`,
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
