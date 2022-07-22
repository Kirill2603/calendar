import React, { FC, useState } from 'react'
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  PopoverBody,
  PopoverTrigger,
  Textarea,
  Grid,
  Box,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverArrow, useDisclosure,
} from '@chakra-ui/react'
import { ArrowForwardIcon, ChatIcon, Icon, StarIcon } from '@chakra-ui/icons'
import { FaCircle, FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import { MdOutlineColorLens } from 'react-icons/md'
import moment, { Moment } from 'moment'
import { newEvent, useAddEventMutation, useLazyGetEventsForMonthQuery } from '../store/eventsSlice'
import { ColorsPopover } from './ColorPopover'
import { TimePicker } from './TimePicker'


type AddEventPopoverBodyProps = {
  eventDate: Moment
  onClose: () => void
  refetch: () => void
}

export const AddEventPopoverBody: FC<AddEventPopoverBodyProps> = ({ eventDate , onClose, refetch}) => {

  const [addEvent, { isLoading }] = useAddEventMutation()

  const [addEventState, setAddEventState] = useState<newEvent>({
    title: '',
    description: '',
    date: Number(moment(eventDate).format('x')),
    start: Number(moment().format('x')),
    end: Number(moment().add(0.5, 'hour').format('x')),
    color: undefined,
  })

  const onAddEvent = async () => {
    await addEvent(addEventState)
    await refetch()
    onClose()
  }

  return (
    <PopoverBody>
      <HStack pb={2}>
        <Box pl={6}>
          <ColorsPopover
            addEventState={addEventState}
            setAddEventState={setAddEventState}
            color={addEventState.color}
          />
        </Box>
        <Input variant='outline'
               placeholder='Title'
               value={addEventState.title}
               onChange={(event) => setAddEventState({ ...addEventState, title: event.target.value })} />
      </HStack>
      <HStack pb={2}>
        <ChatIcon />
        <Textarea
          variant='outline'
          placeholder='Description'
          value={addEventState.description}
          onChange={(event) => setAddEventState({ ...addEventState, description: event.target.value })} />
      </HStack>
      <TimePicker
        start={addEventState.start}
        end={addEventState.end}
        addEventState={addEventState}
        setAddEventState={setAddEventState}
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
