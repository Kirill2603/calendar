import React, { FC, useState } from 'react'
import { ColorPiker, Button, Priority, Input, TimePicker } from 'components/UI'
import {
  useDeleteEventMutation,
  useUpdateEventMutation,
} from 'store/eventsSlice'
import dayjs from 'dayjs'
import { ReactComponent as RightArrowIcon } from 'assets/right-arrow.svg'
import { Event, UpdateEventModel } from 'store/types'
import { SpinnerLoader } from '../UI/Loaders/SpinnerLoader/SpinnerLoader'

type UpdateEventModalBodyProps = {
  event: Event
  onClose: () => void
  refetch: () => void
}

export const UpdateEventModalBody: FC<UpdateEventModalBodyProps> = ({ event, onClose, refetch }) => {

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

  const [updateEvent, {isLoading: updateProgress}] = useUpdateEventMutation()
  const [deleteEvent, {isLoading: deleteProgress}] = useDeleteEventMutation()

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

  if (updateProgress || deleteProgress) {
    return (
      <div className='w-80 h-80 flex flex-col items-center justify-center'>
        <SpinnerLoader />
      </div>
    )
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
      </div>
      <span>Priority:</span>
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
