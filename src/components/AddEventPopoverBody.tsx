import React from 'react'
import { Button, Checkbox, Flex, HStack, IconButton, Input, PopoverBody, Textarea } from '@chakra-ui/react'
import { ArrowForwardIcon, ChatIcon, Icon, StarIcon } from '@chakra-ui/icons'
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'

export const AddEventPopoverBody = () => {
  return (
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
  )
}
