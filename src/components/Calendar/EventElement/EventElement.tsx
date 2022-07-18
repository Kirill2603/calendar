import React, { FC } from 'react'
import { EventElementStyle, EventItem } from './EventElement.style'
import { Event } from '../../../store/eventsSlice'
import { Modal } from '../Modal/Modal'
import moment from 'moment'

type EventElementProps = {
  isModalActive: boolean
  setIsModalActive: (isModalActive: boolean) => void
  event: Event
}

export const EventElement: FC<EventElementProps> = ({ event, isModalActive, setIsModalActive }) => {
  return (
    <EventElementStyle onClick={() => setIsModalActive(true)}>
      <EventItem eventColor={event.color}>
        {event.title}
      </EventItem>
      <Modal
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}>
        <div>
          <h2>{moment(event.date).format('DD MMMM YYYY')}</h2>
          <p>{event.title}</p>
          <p>{event.description}</p>
          <p>{event.priority}</p>
        </div>
      </Modal>
    </EventElementStyle>
  )
}
