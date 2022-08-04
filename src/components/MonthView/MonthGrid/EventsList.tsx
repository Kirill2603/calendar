import React, { FC, useState } from 'react'
import { Event } from 'store/eventsSlice'
import Modal from '../../Modal/Modal'
import dayjs from 'dayjs'
import UpdateEventModalBody from 'components/Modal/UpdateEventModalBody'

type EventListProps = {
  events: Event[] | undefined
}

const EventsList: FC<EventListProps> = ({ events }) => {

  return (
    <ul className=''>
      {events?.map(event =>
        <EventBudge key={event._id} event={event} />,
      )}
    </ul>
  )
}

export default EventsList

type EventBudgeProps = {
  event: Event
}

const EventBudge: FC<EventBudgeProps> = ({ event }) => {

  const [active, setActive] = useState<boolean>(false)

  return (
    <>
      <li
        onClick={() => setActive(true)}
        className={`bg-${event.color}-500 text-${event.color}-100 px-2 mb-1 ml-2 rounded-l text-sm font-bold cursor-pointer hover:ml-1`}>
        {event.title.toUpperCase()}
      </li>
      {active &&
        <Modal
          color={event.color}
          title={dayjs(event.date).format('DD MMMM YYYY')}
          onClose={() => setActive(false)}>
          <UpdateEventModalBody event={event} onClose={() => setActive(false)}/>
        </Modal>}
    </>
  )
}
