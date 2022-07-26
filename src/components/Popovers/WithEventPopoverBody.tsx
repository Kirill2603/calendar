import React, { FC } from 'react'
import {
  Alert,
  Button,
  CloseButton,
  Flex,
  Heading,
  PopoverBody,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import moment from 'moment'
import { Event } from 'store/eventsSlice'
import { EventModal } from 'components/MonthView/EventModal/EventModal'

type WithEventPopoverBodyProps = {
  events: Event[]
  refetch: () => void
  setCreateMod: (createMode: boolean) => void
}

export const WithEventPopoverBody: FC<WithEventPopoverBodyProps> = ({
  events,
  setCreateMod,
  refetch,
}) => {
  return (
    <>
      <PopoverBody>
        <Flex direction='column' justify='flex-start' align='flex-start'>
          {events.map(event => (
            <EventItem key={event._id} event={event} refetch={refetch} />
          ))}
        </Flex>
        <Button onClick={() => setCreateMod(true)} my={2} colorScheme='green'>
          Create
        </Button>
      </PopoverBody>
    </>
  )
}

type EventItemProps = {
  event: Event
  refetch: () => void
}

export const EventItem: FC<EventItemProps> = ({ event, refetch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onOpen()
    e.stopPropagation()
  }

  return (
    <>
      <Alert
        p={1}
        onClick={e => onClick(e)}
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
              <Text>
                {event.start && event.end && moment(event.end).format('kk : mm')}
              </Text>
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
      {isOpen && (
        <EventModal
          event={event}
          refetch={refetch}
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
        />
      )}
    </>
  )
}
