import React, { FC } from 'react'
import { Event } from 'store/types'
import { EventBudge } from './EventBudges/EventBudge'

type EventListProps = {
  events: Event[] | undefined
  type: 'mini' | 'default'
}

export const EventsList: FC<EventListProps> = ({ events, type }) => {

  return (
    <ul className=''>
      {events?.map(event =>
        type === 'mini'
          ?
          <EventBudge key={event._id} event={event} type='mini' />
          :
          <EventBudge key={event._id} event={event} type='default' />,
      )}
    </ul>
  )
}