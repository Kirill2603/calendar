import React, { FC } from 'react'
import { ArrowForwardIcon, Icon } from '@chakra-ui/icons'
import { FaClock } from 'react-icons/fa'
import { HStack, Input } from '@chakra-ui/react'
import moment, { Moment } from 'moment'
import { newEvent } from '../store/eventsSlice'

type TimePickerProps = {
  start: number | undefined
  end: number | undefined
  addEventState: newEvent
  setAddEventState: (addEventState: newEvent) => void
  eventDate: Moment
}

export const TimePicker: FC<TimePickerProps> = ({ start, end, addEventState, setAddEventState, eventDate }) => {

  const setTime = (time: string) => Number(
    moment(eventDate)
      .clone()
      .hour(Number(time.slice(0, 2)))
      .minutes(Number(time.slice(3, 5)))
      .format('x'),
  )

  return (
    <HStack py={2}>
      <Icon as={FaClock} />
      <Input
        type='time'
        variant='outline'
        min='00:00' max='23:59'
        value={moment(addEventState.start).clone().format('HH:mm')}
        onChange={(event) => {
          setAddEventState({ ...addEventState, start: setTime(event.target.value) })
        }}>
      </Input>
      <ArrowForwardIcon />
      <Input
        type='time'
        variant='outline'
        min='00:00' max='23:59'
        value={moment(addEventState.end).clone().format('HH:mm')}
        onChange={(event) => {
          setAddEventState({ ...addEventState, end: setTime(event.target.value) })
        }}>
      </Input>
    </HStack>
  )
}