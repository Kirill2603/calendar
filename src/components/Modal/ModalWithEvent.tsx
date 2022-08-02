import React, { FC } from 'react'
import { Event } from 'store/eventsSlice'
import dayjs, { Dayjs } from 'dayjs'
import Button from '../UI/Button'
import Input from '../UI/Input'

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
  return (
    <div className='p-2'>
      <div>
        <Input value={title} placeholder={'Title'} />
      </div>
      <div>
        <Input value={description} placeholder={'Description'} />
      </div>
      <div>start: {start}</div>
      <div>end: {end}</div>
      <div>priority: {priority}</div>
      <div>color: {color}</div>
      <div>isDone: {is_done ? 'true' : 'false'}</div>
      <EventTimeLine start={dayjs(start)} end={dayjs(end)} />

      <Button colorScheme={'red'}>Delete</Button>
      <Button colorScheme={'green'}>Save</Button>
    </div>
  )
}

export default ModalWithEvent

type EventTimeLineProps = {
  start: Dayjs
  end: Dayjs
}

const EventTimeLine: FC<EventTimeLineProps> = ({ start, end }) => {
  let hour = 0
  const hours = [...Array(24)].map(() => hour++)

  return (
    <div>
      timeline
      <div className='flex flex-row justify-between'>
        {hours.map(hour => <div key={hour}>{hour}</div>)}
      </div>
    </div>
  )
}