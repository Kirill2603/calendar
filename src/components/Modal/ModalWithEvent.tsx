import React, { FC, useState } from 'react'
import {
  Event,
  UpdateEventModel,
  useDeleteEventMutation,
  useGetEventsForMonthQuery,
  useUpdateEventMutation,
} from 'store/eventsSlice'
import dayjs, { Dayjs } from 'dayjs'
import Button from '../UI/Button'
import Input from '../UI/Input'
import { useAppSelector } from '../../store/store'
import ColorPiker from '../UI/ColorPiker'
import Priority from '../UI/Priority'
import TimePicker from '../UI/TimePicker/TimePicker'
import { ReactComponent as RightArrowIcon } from 'assets/right-arrow.svg'

type ModalWithEventProps = {
  event: Event
  onClose: () => void
}

const ModalWithEvent: FC<ModalWithEventProps> = ({ event, onClose }) => {

  const [currentEvent, setCurrentEvent] = useState<UpdateEventModel>(
    {
      _id: event._id,
      color:event.color,
      title: event.title,
      description: event.description,
      priority: event.priority,
      is_done:event.is_done,
      date: dayjs(event.date).unix()*1000,
      start: dayjs(event.start).unix()*1000,
      end: dayjs(event.end).unix()*1000,
  })

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
    <div className='p-2 flex flex-col bg'>
      <ColorPiker
        activeColor={currentEvent.color}
        onChangeColor={color => setCurrentEvent({ ...currentEvent, color })} />
      <div className='flex flex-col py-2 items-start w-full'>
        <span>Title:</span>
        <Input
          onChange={value => setCurrentEvent({ ...currentEvent, title: value })}
          value={currentEvent.title}
          placeholder={'Title'} />
      </div>
      <div className='flex flex-col py-2 items-start w-full'>
        <span>Description:</span>
        <Input
          onChange={value => setCurrentEvent({ ...currentEvent, description: value })}
          value={currentEvent.description}
          placeholder={'Description'} />
        <span>Priority:</span>
      </div>

      <div className='flex flex-col py-2 items-start w-full'>
        <Priority
          priority={currentEvent.priority}
          onChange={priority => setCurrentEvent({ ...currentEvent, priority })} />
      </div>

      <div className='flex flex-row justify-between py-2'>
        <TimePicker value={currentEvent.start} onChange={start => setCurrentEvent(({...currentEvent, start}))}/>
        <RightArrowIcon className='w-10 h-10 fill-amber-50 mx-3'/>
        <TimePicker value={currentEvent.end} onChange={end => setCurrentEvent(({...currentEvent, end}))}/>
      </div>

      <div className='flex flex-row justify-between'>
        <Button colorScheme={'red'} onClick={onClickDelete}>Delete</Button>
        <Button colorScheme={'green'} onClick={onClickSave}>Save</Button>
      </div>
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