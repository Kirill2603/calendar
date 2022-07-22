import React, { FC, useState } from 'react'
import {
  Badge,
  Button, Editable, EditableInput, EditablePreview,
  Flex,
  Modal, ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure, HStack,
} from '@chakra-ui/react'
import { Event, useDeleteEventMutation, useUpdateEventMutation } from '../store/eventsSlice'
import moment, { Moment } from 'moment'
import { EventPopover } from './EventPopover'
import { ColorsPopover } from './ColorPopover'
import { TimePicker } from './TimePicker'

type CalendarCellProps = {
  day: Moment
  events: Event[] | undefined
  isThisMonth: boolean
  isActiveDay: boolean
  isDayOff: boolean
  refetch: () => void
}

export const CalendarCell: FC<CalendarCellProps> = ({
                                                      day,
                                                      events,
                                                      isThisMonth,
                                                      isActiveDay,
                                                      isDayOff,
                                                      refetch,
                                                    }) => {

  const { isOpen, onToggle, onClose } = useDisclosure()


  return (
    <Flex
      h='full'
      direction='column'
      boxShadow={isDayOff ? '10px 10px 5px 200px rgba(0,0,0, 0.2) inset' : ''}>
      <Flex
        direction='row' justify='end'>
        <Button
          variant={isActiveDay ? 'solid' : 'ghost'}
          colorScheme={isActiveDay ? 'red' : ''}
          borderRadius='full'
          opacity={isThisMonth ? '' : '0.4'}
          onClick={onToggle}
          cursor='pointer'
          px={2}
          fontSize='2xl'>{moment(day).format('DD')}</Button>
        {isOpen && <EventPopover isOpen={isOpen} onClose={onClose} day={day} events={events} refetch={refetch} />}
      </Flex>
      <Flex
        direction='column'
        justify='flex-start'>
        {events?.map(event =>
          <EventBudge key={event._id} event={event} refetch={refetch} />,
        )}
      </Flex>
    </Flex>
  )
}

type EventBudgeProps = {
  event: Event
  refetch: () => void
}

const EventBudge: FC<EventBudgeProps> = ({ event, refetch }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [currentEvent, setCurrentEvent] = useState<Event>(event)

  const [updateEvent, updateResult] = useUpdateEventMutation()

  const [deleteEvent, deleteResult] = useDeleteEventMutation()

  const onClickDelete = async () => {
    if (event._id) {
      await deleteEvent(event._id)
    }
    await refetch()
    onClose()
  }

  const onClickSave = async () => {
    await updateEvent(currentEvent)
    await refetch()
    onClose()
  }

  return (
    <>
      <Badge onClick={onOpen} variant='subtle' fontSize='0.9rem' px={2} ml={1} my={0.5}
             colorScheme={event.color}>{event.title}</Badge>
      {
        isOpen && <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset='slideInBottom'
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {moment(event.date).format('DD MMMM YYYY')}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <HStack>
                <ColorsPopover color={currentEvent.color} currentEventState={currentEvent}
                               setCurrentEventState={setCurrentEvent} />
                <Editable size='xl' value={currentEvent.title} >
                  <EditablePreview />
                  <EditableInput onChange={(event) => setCurrentEvent({...currentEvent, title: event.target.value})} />
                </Editable>
              </HStack>
              <HStack>
                <Text>Description :</Text>
                <Editable value={currentEvent.description}>
                  <EditablePreview />
                  <EditableInput onChange={(event) => setCurrentEvent({...currentEvent, description: event.target.value})} />
                </Editable>
              </HStack>
              <TimePicker start={currentEvent.start} end={currentEvent.end} addEventState={currentEvent}
                          eventDate={currentEvent.date} setAddEventState={setCurrentEvent} />
            </ModalBody>
            <ModalFooter>
              <Button variant='outline' colorScheme='red' mr={3} onClick={onClickDelete}>
                Delete
              </Button>
              <Button colorScheme='green' onClick={onClickSave}>Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      }
    </>
  )
}