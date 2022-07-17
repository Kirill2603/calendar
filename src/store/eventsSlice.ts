import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import moment, { Moment } from 'moment'

type Event = {
  _id: string,
  title: string,
  description: string,
  is_done: boolean,
  priority: 'low' | 'middle' | 'high'
  date: Date
  from: Date
  to: Date
}

type UpdateEvent = {
  title: string,
  description: string,
  is_done: boolean,
  priority: 'low' | 'middle' | 'high'
  date: Date
  from: Date
  to: Date
}

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/',
  }),
  endpoints: (builder) => ({
    getAllEvents: builder.query<Event[], void>({
      query: () => '/events',
    }),
    getEventById: builder.query<Event, string>({
      query: (id) => `events/${id}`,
    }),
    getEventsForMonth: builder.query<Event, { start: Moment, end: Moment }>({
      query: ({ start, end }) => `events?start=${ start.unix() * 1000 }&end=${ end.unix() * 1000 }`,
    }),
    updateEvent: builder.mutation<Event, Pick<Event, '_id'> & Partial<Event>>({
      query: ({ _id, ...updatedEvent }) => ({
        url: `/events/${_id}`,
        method: 'PUT',
        body: updatedEvent,
      }),
    }),
  }),
})

export const {
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useUpdateEventMutation,
  useGetEventsForMonthQuery,
} = eventsApi