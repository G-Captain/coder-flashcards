import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const { SERVER_URL } = process.env;

export const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL,
  prepareHeaders: async (headers, { getState }) => {
    return headers;
  },
});
