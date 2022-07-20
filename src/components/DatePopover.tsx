import React, { FC } from 'react'
import {
  Button,
  Center, Checkbox, Flex, HStack, IconButton, Input, Popover,
  PopoverArrow, PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text, Textarea,
} from '@chakra-ui/react'
import moment, { Moment } from 'moment'
import { ArrowForwardIcon, ChatIcon, Icon, StarIcon } from '@chakra-ui/icons'
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa'

type DatePopoverProps = {
  day: Moment
  isOpen: boolean
  onClose: () => void
}

export const DatePopover: FC<DatePopoverProps> = ({ day, onClose, isOpen }) => {
  return (
    <Popover placement='right'
             returnFocusOnClose={false}
             isOpen={isOpen}
             onClose={onClose}
    >
      <PopoverTrigger>
        <Button opacity='0.1' variant='ghost' position='absolute'></Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>
          <Center fontWeight='bold' fontSize='large'>
            {day.format('DD MMMM YYYY')}
          </Center>
        </PopoverHeader>
        <PopoverCloseButton />

        <PopoverBody>
          <HStack pb={2}>
            <IconButton ml={6} aria-label='Search database' variant='outline' icon={<StarIcon />} />
            <Input variant='outline' placeholder='Title' />
            <Checkbox whiteSpace='nowrap'>All Day</Checkbox>
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
      </PopoverContent>
    </Popover>
  )
}
