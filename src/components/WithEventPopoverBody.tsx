import React, { FC } from 'react'
import { Alert, Button, Checkbox, CloseButton, Flex, Heading, PopoverBody, Text } from '@chakra-ui/react'
import moment from 'moment'
import { Event } from '../store/eventsSlice'

type WithEventPopoverBodyProps = {
  events: Event[]
  setCreateMod: (createMode: boolean) => void
}

export const WithEventPopoverBody: FC<WithEventPopoverBodyProps> = ({ events, setCreateMod }) => {
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
                  (event.start && event.end)
                    ?
                    <Flex px={2} direction='column' align='flex-start' justify='flex-start'>
                      <Text whiteSpace='nowrap'>{(event.start && event.end) && moment(event.start).format('kk : mm')}</Text>
                      <Text>{(event.start && event.end) && moment(event.end).format('kk : mm')}</Text>
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
      <Button
        onClick={() => setCreateMod(true)}
        my={2}
        colorScheme='green'>Create</Button>
    </PopoverBody>
  )
}
