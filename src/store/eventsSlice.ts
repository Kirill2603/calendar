import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Dayjs } from 'dayjs'

export enum Priorities {
  'low' = 0,
  'middle' = 1,
  'high' = 2,
}

export enum Colors {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
  PURPLE = 'purple',
  ORANGE = 'orange',
  YELLOW = 'yellow',
}

export type Event = {
  _id: string,
  title: string,
  description?: string,
  is_done?: boolean,
  color: Colors
  priority: Priorities
  date: Date
  start?: Date
  end?: Date
}

export type UpdateEventModel = {
  _id: string,
  title: string,
  description?: string,
  is_done?: boolean,
  color?: Colors
  priority?: Priorities
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
    getEventsForMonth: builder.query<Event[], { start: Dayjs, end: Dayjs }>({
      query: ({ start, end }) => `events?start=${ start.unix()*1000 }&end=${ end.unix()*1000 }`,
    }),
    addEvent: builder.mutation<Event, Event>({
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
  useGetEventsForMonthQuery
} = eventsApi