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
import { PopoverEvent } from './PopoverEvent'

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
  const { isOpen, onOpen, onClose } = useDisclosure()

  const OnEventClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onOpen()
    e.stopPropagation()
  }

  return (
    <>
    <PopoverBody>
      <Flex direction='column' justify='flex-start' align='flex-start'>
        {events.map(event => (
          <PopoverEvent key={event._id} event={event} onOpen={onOpen}/>
        ))}
      </Flex>
      <Button onClick={() => setCreateMod(true)} my={2} colorScheme='green'>
        Create
      </Button>
    </PopoverBody>
    {/* {isOpen && (
              <EventModal
                event={event}
                refetch={refetch}
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
              />
            )} */}
    </>
  )
}
