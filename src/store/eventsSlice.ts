import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Moment } from 'moment'

export type Event = {
  _id?: string,
  title: string,
  description?: string,
  is_done?: boolean,
  color?: 'red' | 'green' | 'blue' | 'purple' | 'orange' | 'yellow'
  priority?: 'low' | 'middle' | 'high'
  date: number
  start?: number
  end?: number
}

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://evening-coast-03343.herokuapp.com/api/',
  }),
  endpoints: (builder) => ({
    getAllEvents: builder.query<Event[], void>({
      query: () => '/events',
    }),
    getEventById: builder.query<Event, string>({
      query: (id) => `events/${id}`,
    }),
    getEventsForMonth: builder.query<Event[], { start: Moment, end: Moment }>({
      query: ({ start, end }) => `events?start=${ start.format("x") }&end=${ end.format("x") }`,
    }),
    addEvent: builder.mutation<Event, Event>({
      query: (newEvent) => ({
        url: `/events`,
        method: 'POST',
        body: newEvent,
      }),
    }),
    updateEvent: builder.mutation<Event, Pick<Event, '_id'> & Partial<Event>>({
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
  useGetEventsForMonthQuery,
  useDeleteEventMutation,
} = eventsApi