import React, { FC } from 'react'
import { Alert, Button, Flex, PopoverBody } from '@chakra-ui/react'
import moment from 'moment'
import { Event } from '../store/eventsSlice'

type WithEventPopoverBodyProps = {
  events: Event[]
}

export const WithEventPopoverBody: FC<WithEventPopoverBodyProps> = ({events}) => {
  return (
    <PopoverBody>
      <Flex direction='column' justify='flex-start' align='flex-start'>
        {events.map(event =>
          <Alert
            p={1}
            borderRadius='md'
            variant='left-accent'
            px={2} my={1}
            fontSize='1rem'
            colorScheme={event.color}
            key={event._id}>
            <Flex direction='column' align='flex-start' justify='flex-start'>
              <div>
                {(event.from && event.to) ? moment(event.from).format('HH : MM') : 'All day '}
              </div>
              <div>
                {(event.from && event.to) ? moment(event.to).format('HH : MM') : 'All day '}
              </div>
            </Flex>
            {event.title}
          </Alert>
        )}
      </Flex>
      <Button my={2} colorScheme='green'>Create</Button>
    </PopoverBody>
  )
}
