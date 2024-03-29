import React, { FC, useState } from 'react'
import { ColorPiker, Button, Priority, Input, TimePicker } from 'components/UI'
import { ReactComponent as RightArrowIcon } from '../../assets/right-arrow.svg'
import { useAddEventMutation } from '../../store/eventsSlice'
import dayjs, { Dayjs } from 'dayjs'
import { CreateEventModel, Priorities } from '../../store/types'
import { SpinnerLoader } from '../UI/Loaders/SpinnerLoader/SpinnerLoader'

type CreateEventModalBodyProps = {
  day: Dayjs
  onClose: () => void
  refetch: () => void
}

export const CreateEventModalBody: FC<CreateEventModalBodyProps> = ({ day, onClose, refetch }) => {

  const [addEvent, { isLoading }] = useAddEventMutation()

  const [currentEvent, setCurrentEvent] = useState<CreateEventModel>(
    {
      color: undefined,
      title: '',
      description: '',
      priority: Priorities.low,
      is_done: false,
      date: day.unix() * 1000,
      start: dayjs().unix() * 1000,
      end: dayjs().unix() * 1000,
    })

  const onAddEvent = async () => {
    await addEvent(currentEvent)
    await refetch()
    onClose()
  }

  if (isLoading) {
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
        <TimePicker value={currentEvent.start} onChange={start => setCurrentEvent(({ ...currentEvent, start }))} />
        <RightArrowIcon className='w-10 h-10 fill-amber-50 mx-3' />
        <TimePicker value={currentEvent.end} onChange={end => setCurrentEvent(({ ...currentEvent, end }))} />
      </div>

      <div className='flex flex-row justify-end'>
        <Button colorScheme={'green'} onClick={onAddEvent}>Add</Button>
      </div>
    </div>
  )
}
