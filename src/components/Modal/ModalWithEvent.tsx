import React, { FC, useState } from 'react'
import { Event, useDeleteEventMutation, useGetEventsForMonthQuery, useUpdateEventMutation } from 'store/eventsSlice'
import dayjs, { Dayjs } from 'dayjs'
import Button from '../UI/Button'
import Input from '../UI/Input'
import { useAppSelector } from '../../store/store'

type ModalWithEventProps = {
  event: Event
  onClose: () => void
}

const ModalWithEvent: FC<ModalWithEventProps> = ({ event, onClose }) => {

  const [currentEvent, setCurrentEvent] = useState<Event>(event)

  const { monthDays } = useAppSelector(state => state.calendar)
  const { refetch } = useGetEventsForMonthQuery({ start: monthDays[0], end: monthDays[41] })
  const [updateEvent, updateResult] = useUpdateEventMutation()
  const [deleteEvent, deleteResult] = useDeleteEventMutation()

  const onClickDelete = async () => {
    if (event._id) {
      await deleteEvent(event._id)
    }
    await refetch()
    onClose()
  }

  const onClickSave = async () => {
    await updateEvent(currentEvent)
    await refetch()
    onClose()
  }

  return (
    <div className='p-2'>
      <div>
        <Input
          onChange={value => setCurrentEvent({ ...currentEvent, title: value })}
          value={currentEvent.title}
          placeholder={'Title'} />
      </div>
      <div>
        <Input
          onChange={value => setCurrentEvent({ ...currentEvent, description: value })}
          value={currentEvent.description}
          placeholder={'Description'} />
      </div>
      <div>start: {currentEvent.start}</div>
      <div>end: {currentEvent.end}</div>
      <div>priority: {currentEvent.priority}</div>
      <div>color: {currentEvent.color}</div>
      <div>isDone: {currentEvent.is_done ? 'true' : 'false'}</div>
      <EventTimeLine start={dayjs(currentEvent.start)} end={dayjs(currentEvent.end)} />

      <Button colorScheme={'red'} onClick={onClickDelete}>Delete</Button>
      <Button colorScheme={'green'} onClick={onClickSave}>Save</Button>
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