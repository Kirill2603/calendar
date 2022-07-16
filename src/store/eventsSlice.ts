import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Event = {
  _id: string,
  title: string,
  description: string,
  is_done: boolean,
  priority: 'low' | 'middle' | 'high'
  created: Date
  from: Date
  to: Date
}

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
  }),
  endpoints: (builder) => ({
    getEvents: builder.query<Event[], void>({
      query: () => '/events',
    }),
  }),
})

export const { useGetEventsQuery } = eventsApi