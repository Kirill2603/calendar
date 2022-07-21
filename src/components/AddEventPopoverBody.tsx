import React, { FC, useState } from 'react'
import {
  Button,
  Checkbox,
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
  PopoverArrow,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberDecrementStepper, Select,
} from '@chakra-ui/react'
import { ArrowForwardIcon, ChatIcon, Icon, StarIcon } from '@chakra-ui/icons'
import { FaCircle, FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import { MdOutlineColorLens } from 'react-icons/md'
import moment, { Moment } from 'moment'
import { newEvent, useAddEventMutation } from '../store/eventsSlice'
import { log } from 'util'

type AddEventPopoverBodyProps = {
  eventDate: Moment
}

export const AddEventPopoverBody: FC<AddEventPopoverBodyProps> = ({eventDate}) => {

  const [addEventState, setAddEventState] = useState<newEvent>({
    title: '',
    description: '',
    date: Number(moment(eventDate).format("x")),
    start: Number(moment().format("x")),
    end: Number(moment().add(1, 'hour').add(1, 'minutes').format("x")),
    color: undefined,
    // isDone: false,
  })

  const [addEvent, { isLoading }] = useAddEventMutation()

  const colors: Array<'red' | 'green' | 'blue' | 'purple' | 'orange' | 'yellow'> = ['red', 'green', 'blue', 'purple', 'orange', 'yellow']

  const timeNow = moment().format('HH:mm')


  const setTime = (time: string) => Number(
    moment(eventDate)
      .clone()
      .hour(Number(time.slice(0,2)))
      .minutes(Number(time.slice(3,5)))
      .format('x')
  )



  console.log(setTime('12:12'))
  console.log(setTime('23:23'))


  return (
    <PopoverBody>
      <HStack pb={2}>
        <Box pl={6}>
          <Popover placement='bottom-start'>
            <PopoverTrigger>
              <IconButton aria-label='color' backgroundColor={addEventState.color ? addEventState.color : ''}
                          icon={<MdOutlineColorLens />} />
            </PopoverTrigger>
            <PopoverContent w='fit-content'>
              <PopoverHeader fontWeight='bold'>Color</PopoverHeader>
              <PopoverArrow />
              <Grid templateColumns='repeat(3, 1fr)'>
                {colors.map(color =>
                  <IconButton
                    key={color}
                    as={'li'}
                    m={2}
                    aria-label={color}
                    onClick={() => setAddEventState({ ...addEventState, color: color })}
                    icon={<FaCircle fill={color} />} />,
                )}
              </Grid>
            </PopoverContent>
          </Popover>
        </Box>
        <Input variant='outline'
               placeholder='Title'
               value={addEventState.title}
               onChange={(event) => setAddEventState({ ...addEventState, title: event.target.value })} />
        <Checkbox whiteSpace='nowrap' isChecked={false}>All Day</Checkbox>
      </HStack>
      <HStack pb={2}>
        <ChatIcon />
        <Textarea
          variant='outline'
          placeholder='Description'
          value={addEventState.description}
          onChange={(event) => setAddEventState({ ...addEventState, description: event.target.value })} />
      </HStack>
      <HStack py={2}>
        <Icon as={FaClock} />
        {/*<Select placeholder='Select option'>*/}
        {/*  {hours.map(hour => <option value='hour'>{hour}</option>)}*/}
        {/*</Select>*/}
        {/*<Select placeholder='Select option'>*/}
        {/*  {minutes.map(minute => <option value='minute'>{minute}</option>)}*/}
        {/*</Select>*/}
        <Input
          type='time'
          variant='outline'
          min='00:00' max='23:59'
          value={moment(addEventState.start).clone().format('HH:mm')}
          onChange={(event) => {setAddEventState({...addEventState, start: setTime(event.target.value)})}} >
        </Input>
        <ArrowForwardIcon />
        <Input
          type='time'
          variant='outline'
          min='00:00' max='23:59'
          value={moment(addEventState.end).clone().format('HH:mm')}
          onChange={(event) => {setAddEventState({...addEventState, end: setTime(event.target.value)})}} >
        </Input>
      </HStack>
      {/*<HStack py={2}>*/}
      {/*  <Icon as={FaMapMarkerAlt} /> <Input variant='outline' placeholder='Place' />*/}
      {/*</HStack>*/}
      <Flex py={2} justify='end'>
        <Button onClick={() => addEvent(addEventState)} colorScheme='green'>Add</Button>
      </Flex>
    </PopoverBody>
  )
}
