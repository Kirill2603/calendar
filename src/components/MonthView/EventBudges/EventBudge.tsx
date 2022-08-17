import { Event } from 'store/types'
import React, { FC, useState } from 'react'
import dayjs from 'dayjs'
import { Modal } from 'components/Modal/Modal'
import { UpdateEventModalBody } from 'components/Modal/UpdateEventModalBody'

type EventBudgeProps = {
  event: Event
  type: 'mini' | 'default'
  refetch: () => void
}

export const EventBudge: FC<EventBudgeProps> = ({ event, type, refetch }) => {

  const [active, setActive] = useState<boolean>(false)

  return (
    <>
      {type === 'default' &&
        <li
        onClick={() => setActive(true)}
        className={`bg-${event.color}-500 text-${event.color}-100 rounded border-l-8 border-${event.color}-500 text-base font-bold cursor-pointer px-2 my-1 hover:border-indigo-50`}>
        <div className='flex flex-row items-center'>
          <div className='flex flex-col '>
            <span>{dayjs(event.start).format('HH:mm')}</span>
            <span>{dayjs(event.end).format('HH:mm')}</span>
          </div>
          <span className='w-full px-8'>{event.title.toUpperCase()}</span>
        </div>
      </li>}

      {type === 'mini' &&
        <li
          onClick={() => setActive(true)}
          className={`bg-${event.color}-500 text-${event.color}-100 px-2 mb-1 ml-2 rounded-l text-sm font-bold cursor-pointer hover:ml-1`}>
          {event.title.toUpperCase()}
        </li>
      }

      {active &&
        <Modal
          color={event.color}
          title={dayjs(event.date).format('DD MMMM YYYY')}
          onClose={() => setActive(false)}>
          <UpdateEventModalBody event={event} onClose={() => setActive(false)} refetch={refetch}/>
        </Modal>}
    </>
  )
}
