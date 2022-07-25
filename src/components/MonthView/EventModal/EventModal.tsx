import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Modal,
  Text,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { TimePicker } from 'components/TimePicker'
import moment from 'moment'
import { Event } from 'store/eventsSlice'
import React, { FC } from 'react'
import { ColorsPopover } from '../Popovers/ColorPopover'

type EventModalProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  currentEvent: Event
  setCurrentEvent: (currentEvent: Event) => void
  onClickSave: () => void
  onClickDelete: () => void
}

export const EventModal: FC<EventModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  currentEvent,
  setCurrentEvent,
  onClickDelete,
  onClickSave,
}) => {
  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{moment(currentEvent.date).format('DD MMMM YYYY')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack>
            <ColorsPopover
              color={currentEvent.color}
              currentEventState={currentEvent}
              setCurrentEventState={setCurrentEvent}
            />
            <Editable size='xl' value={currentEvent.title}>
              <EditablePreview />
              <EditableInput
                onChange={event =>
                  setCurrentEvent({ ...currentEvent, title: event.target.value })
                }
              />
            </Editable>
          </HStack>
          <HStack>
            <Text>Description :</Text>
            <Editable value={currentEvent.description}>
              <EditablePreview />
              <EditableInput
                onChange={event =>
                  setCurrentEvent({
                    ...currentEvent,
                    description: event.target.value,
                  })
                }
              />
            </Editable>
          </HStack>
          <TimePicker
            start={currentEvent.start}
            end={currentEvent.end}
            addEventState={currentEvent}
            eventDate={currentEvent.date}
            setAddEventState={setCurrentEvent}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant='outline' colorScheme='red' mr={3} onClick={onClickDelete}>
            Delete
          </Button>
          <Button colorScheme='green' onClick={onClickSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
