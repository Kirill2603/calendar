import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/events',
  }),
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (events) => events,
    }),
  }),
})

export const { useGetEventsQuery } = eventsApi