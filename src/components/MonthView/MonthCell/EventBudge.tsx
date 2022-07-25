import { Badge, useDisclosure } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { useUpdateEventMutation, useDeleteEventMutation } from 'store/eventsSlice'
import { Event } from 'store/eventsSlice'
import { EventModal } from '../EventModal/EventModal'

type EventBudgeProps = {
  event: Event
  refetch: () => void
}

export const EventBudge: FC<EventBudgeProps> = ({ event, refetch }) => {
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
      <Badge
        onClick={onOpen}
        variant='subtle'
        fontSize='0.9rem'
        cursor='pointer'
        px={2}
        ml={1}
        my={0.5}
        colorScheme={event.color}>
        {event.title}
      </Badge>
      {isOpen && (
        <EventModal
          onClickSave={onClickSave}
          onClickDelete={onClickDelete}
          currentEvent={currentEvent}
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          setCurrentEvent={setCurrentEvent}
        />
      )}
    </>
  )
}
