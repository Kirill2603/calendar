import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Dayjs } from 'dayjs'
import { Event, CreateEventModel, UpdateEventModel } from './types'

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://calendar-back-seven.vercel.app/',
  }),
  endpoints: (builder) => ({
    getAllEvents: builder.query<Event[], void>({
      query: () => '/events',
    }),
    getEventById: builder.query<Event, string>({
      query: (id) => `events/${id}`,
    }),
    getEventsForMonth: builder.query<Event[], { start: Dayjs, end: Dayjs }>({
      query: ({ start, end }) => `events?start=${start.unix() * 1000}&end=${end.unix() * 1000}`,
    }),
    addEvent: builder.mutation<Event, CreateEventModel>({
      query: (newEvent) => ({
        url: `/events`,
        method: 'POST',
        body: newEvent,
      }),
    }),
    updateEvent: builder.mutation<Event, Pick<Event, '_id'> & UpdateEventModel>({
      query: ({ _id, ...updatedEvent }) => ({
        url: `/events/${_id}`,
        method: 'PUT',
        body: updatedEvent,
      }),
    }),
    deleteEvent: builder.mutation<Event, string>({
      query: (_id) => ({
        url: `/events/${_id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useUpdateEventMutation,
  useAddEventMutation,
  useDeleteEventMutation,
  useGetEventsForMonthQuery,
} = eventsApi
