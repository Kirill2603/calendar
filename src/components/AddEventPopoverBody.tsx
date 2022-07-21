import React, { useState } from 'react'
import {
  Button,
  Checkbox,
  Flex,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  PopoverBody,
  PopoverTrigger,
  Textarea,
  Grid,
  MenuList, MenuItem, Box, Popover, PopoverContent, PopoverHeader, PopoverArrow,
} from '@chakra-ui/react'
import { ArrowForwardIcon, ChatIcon, Icon, StarIcon } from '@chakra-ui/icons'
import { FaCircle, FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import { MdOutlineColorLens } from 'react-icons/md'

export const AddEventPopoverBody = () => {

  const [addEventState, setAddEventState] = useState({
    title: '',
    description: '',
    allDay: false,
    start: 0,
    end: 0,
    isDone: false,
  })

  return (
    <PopoverBody>
      <HStack pb={2}>
        <Box>
          <Popover placement='bottom-start'>
            <PopoverTrigger>
              <IconButton aria-label='color' variant='outline' icon={<MdOutlineColorLens />} />
            </PopoverTrigger>
            <PopoverContent  w='fit-content'>
              <PopoverHeader fontWeight='bold'>Color</PopoverHeader>
              <PopoverArrow />
              <Grid templateColumns='repeat(3, 1fr)'>
                <IconButton as={'li'} m={2} aria-label='red' icon={<FaCircle fill='red' />} />
                <IconButton as={'li'} m={2} aria-label='red' icon={<FaCircle fill='green' />} />
                <IconButton as={'li'} m={2} aria-label='red' icon={<FaCircle fill='blue' />} />
                <IconButton as={'li'} m={2} aria-label='red' icon={<FaCircle fill='purple' />} />
                <IconButton as={'li'} m={2} aria-label='red' icon={<FaCircle fill='orange' />} />
                <IconButton as={'li'} m={2} aria-label='red' icon={<FaCircle fill='yellow' />} />
              </Grid>
            </PopoverContent>
          </Popover>
        </Box>
        <Input variant='outline' placeholder='Title' />
        <Checkbox whiteSpace='nowrap' isChecked={addEventState.allDay}>All Day</Checkbox>
      </HStack>
      <HStack pb={2}>
        <ChatIcon />
        <Textarea variant='outline' placeholder='Description' />
      </HStack>
      <HStack py={2}>
        <Icon as={FaClock} />
        <Input type='time' variant='outline' />
        <ArrowForwardIcon />
        <Input type='time' variant='outline' />
      </HStack>
      <HStack py={2}>
        <Icon as={FaMapMarkerAlt} /> <Input variant='outline' placeholder='Place' />
      </HStack>
      <Flex py={2} justify='end'>
        <Button colorScheme='green'>Add</Button>
      </Flex>
    </PopoverBody>
  )
}
