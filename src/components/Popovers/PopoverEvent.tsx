import { Alert, Flex, Heading, CloseButton, Text } from '@chakra-ui/react'
import moment from 'moment'
import React, { FC } from 'react'
import { Event } from 'store/eventsSlice'

type PopoverEventProps = {
    onOpen: () => void
    event: Event
}

export const PopoverEvent: FC<PopoverEventProps> = ({onOpen, event}) => {
  return (
    <Alert
      onClick={onOpen}
      p={1}
      borderRadius='md'
      variant='left-accent'
      px={2}
      my={1}
      h='4rem'
      fontSize='1rem'
      colorScheme={event.color}
      key={event._id}>
      <Flex
        direction='row'
        justify='space-between'
        align='center'
        w='full'
        cursor='pointer'>
        {event.start && event.end ? (
          <Flex px={2} direction='column' align='flex-start' justify='flex-start'>
            <Text whiteSpace='nowrap'>
              {event.start && event.end && moment(event.start).format('kk : mm')}
            </Text>
            <Text>{event.start && event.end && moment(event.end).format('kk : mm')}</Text>
          </Flex>
        ) : (
          <Text px={2} w='full'>
            All day
          </Text>
        )}
        <Heading size='md'>{event.title}</Heading>
        <CloseButton />
      </Flex>
    </Alert>
  )
}
