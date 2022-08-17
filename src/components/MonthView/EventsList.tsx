import React, { FC } from 'react'
import { Event } from 'store/types'
import { EventBudge } from './EventBudges/EventBudge'

type EventListProps = {
  events: Event[] | undefined
  type: 'mini' | 'default'
  refetch: () => void
}

export const EventsList: FC<EventListProps> = ({ events, type, refetch }) => {

  return (
    <ul className=''>
      {events?.map(event =>
        type === 'mini'
          ?
          <EventBudge key={event._id} event={event} type='mini' refetch={refetch} />
          :
          <EventBudge key={event._id} event={event} type='default' refetch={refetch}/>,
      )}
    </ul>
  )
}