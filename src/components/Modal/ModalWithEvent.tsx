import React, { FC } from 'react'
import { Event } from 'store/eventsSlice'
import dayjs, { Dayjs } from 'dayjs'

type ModalWithEventProps = {
  event: Event
}

const ModalWithEvent: FC<ModalWithEventProps> = (
  {
    event: {
      title,
      description,
      priority,
      date,
      start,
      end,
      color,
      is_done,
    },
  }) => {
  console.log(is_done)
  return (
    <div>
      <div>title: {title}</div>
      <div>description: {description}</div>
      <div>start: {start}</div>
      <div>end: {end}</div>
      <div>priority: {priority}</div>
      <div>color: {color}</div>
      <div>isDone: {is_done ? 'true' : 'false'}</div>
      <EventTimeLine start={dayjs(start)} end={dayjs(end)} />
    </div>
  )
}

export default ModalWithEvent

type EventTimeLineProps = {
  start: Dayjs
  end: Dayjs
}

const EventTimeLine: FC<EventTimeLineProps> = ({start, end}) => {
  let hour = 0
  const hours = [...Array(24)].map(() => hour++)
  console.log(hours)
  return (
    <div>
      timeline
      <div className='flex flex-row justify-between'>
        {hours.map(hour => <div key={hour}>{hour}</div>)}
      </div>
    </div>
  )
}