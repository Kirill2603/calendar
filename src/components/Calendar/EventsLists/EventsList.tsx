import React, { FC } from 'react'
import { EventsListStyle } from './EventsList.style'
import { Event } from '../../../store/eventsSlice'

type EventsListProps = {
  events: Event[]
}

export const EventsList: FC<EventsListProps> = ({events}) => {

  return (
    <EventsListStyle>
      {events.map(event => <li key={event._id}>{event.title}</li>)}
    </EventsListStyle>
  )
}
