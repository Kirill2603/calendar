import React, { FC, useState } from 'react'
import {
  Button,
  Flex,
  HStack,
  Input,
  PopoverBody,
  Textarea,
  Box,
} from '@chakra-ui/react'
import {  ChatIcon, Icon } from '@chakra-ui/icons'
import { FaMapMarkerAlt } from 'react-icons/fa'
import moment from 'moment'
import { Event, useAddEventMutation } from '../../../store/eventsSlice'
import { ColorsPopover } from './ColorPopover'
import { TimePicker } from '../../TimePicker'


type AddEventPopoverBodyProps = {
  eventDate: number
  onClose: () => void
  refetch: () => void
}

export const AddEventPopoverBody: FC<AddEventPopoverBodyProps> = ({ eventDate , onClose, refetch}) => {

  const [addEvent, { isLoading }] = useAddEventMutation()

  const [currentEventState, setCurrentEventState] = useState<Event>({
    title: '',
    description: '',
    date: Number(moment(eventDate).format('x')),
    start: Number(moment().format('x')),
    end: Number(moment().add(0.5, 'hour').format('x')),
    color: undefined,
  })

  const onAddEvent = async () => {
    await addEvent(currentEventState)
    await refetch()
    onClose()
  }

  return (
    <PopoverBody>
      <HStack pb={2}>
        <Box pl={6}>
          <ColorsPopover
            currentEventState={currentEventState}
            setCurrentEventState={setCurrentEventState}
            color={currentEventState.color}
          />
        </Box>
        <Input variant='outline'
               placeholder='Title'
               value={currentEventState.title}
               onChange={(event) => setCurrentEventState({ ...currentEventState, title: event.target.value })} />
      </HStack>
      <HStack pb={2}>
        <ChatIcon />
        <Textarea
          variant='outline'
          placeholder='Description'
          value={currentEventState.description}
          onChange={(event) => setCurrentEventState({ ...currentEventState, description: event.target.value })} />
      </HStack>
      <TimePicker
        start={currentEventState.start}
        end={currentEventState.end}
        addEventState={currentEventState}
        setAddEventState={setCurrentEventState}
        eventDate={eventDate}/>
      <HStack py={2}>
        <Icon as={FaMapMarkerAlt} /> <Input variant='outline' placeholder='Place' />
      </HStack>
      <Flex py={2} justify='end'>
        <Button onClick={onAddEvent} colorScheme='green'>Add</Button>
      </Flex>
    </PopoverBody>
  )
}
