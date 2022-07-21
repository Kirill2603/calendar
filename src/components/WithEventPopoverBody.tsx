import React, { FC } from 'react'
import { Alert, Button, Checkbox, CloseButton, Flex, Heading, PopoverBody, Text } from '@chakra-ui/react'
import moment from 'moment'
import { Event } from '../store/eventsSlice'

type WithEventPopoverBodyProps = {
  events: Event[]
}

export const WithEventPopoverBody: FC<WithEventPopoverBodyProps> = ({ events }) => {
  return (
    <PopoverBody>
      <Flex direction='column' justify='flex-start' align='flex-start'>
        {events.map(event =>
          <Alert
            p={1}
            borderRadius='md'
            variant='left-accent'
            px={2} my={1}
            h='4rem'
            fontSize='1rem'
            colorScheme={event.color}
            key={event._id}>
            <Flex direction='row' justify='space-between' align='center' w='full'>
                {
                  (event.from && event.to)
                    ?
                    <Flex px={2} direction='column' align='flex-start' justify='flex-start'>
                      <Text>{(event.from && event.to) ? moment(event.from).format('HH : MM') : 'All day '}</Text>
                      <Text>{(event.from && event.to) ? moment(event.to).format('HH : MM') : 'All day '}</Text>
                    </Flex>
                    :
                    <Text px={2}>All day</Text>
                }
              <Heading size='md'>{event.title}</Heading>
              <Flex>
                <Checkbox px={3} isChecked={event.is_done}>Done</Checkbox>
                <CloseButton size='sm' />
              </Flex>
            </Flex>
          </Alert>,
        )}
      </Flex>
      <Button my={2} colorScheme='green'>Create</Button>
    </PopoverBody>
  )
}
