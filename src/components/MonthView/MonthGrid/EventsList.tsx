import React, { FC, useState } from 'react'
import { Event } from 'store/eventsSlice'
import Modal from '../../Modal/Modal'
import dayjs from 'dayjs'
import UpdateEventModalBody from 'components/Modal/UpdateEventModalBody'

type EventListProps = {
  events: Event[] | undefined
  type: 'mini' | 'normal'
}

const EventsList: FC<EventListProps> = ({ events, type }) => {

  return (
    <ul className=''>
      {events?.map(event =>
        type === "mini" ? <EventMiniBudge key={event._id} event={event} /> : <EventBudge key={event._id} event={event}/>
      )}
    </ul>
  )
}

export default EventsList

type EventMiniBudgeProps = {
  event: Event
}

export const EventMiniBudge: FC<EventMiniBudgeProps> = ({ event }) => {

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

type EventBudgeProps = {
  event: Event
}

export const EventBudge: FC<EventBudgeProps> = ({ event }) => {

  const [active, setActive] = useState<boolean>(false)

  return (
    <>
      <li
        onClick={() => setActive(true)}
        className={`bg-${event.color}-500 text-${event.color}-100 rounded border-l-8 border-${event.color}-500 text-base font-bold cursor-pointer px-2 my-1 hover:border-indigo-50`}>
        <div className='flex flex-row w-44 items-center'>
          <div className='flex flex-col '>
            <span>{dayjs(event.start).format('HH:mm')}</span>
            <span>{dayjs(event.end).format('HH:mm')}</span>
          </div>
          <span className='w-full'>{event.title.toUpperCase()}</span>
        </div>
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
