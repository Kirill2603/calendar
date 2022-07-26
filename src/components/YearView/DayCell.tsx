import { Button, Popover, useDisclosure } from '@chakra-ui/react'
import { EventPopover } from 'components/Popovers/EventPopover'
import moment, { Moment } from 'moment'
import React, { FC, useState } from 'react'
import { FaEllipsisV } from 'react-icons/fa'
import { Event } from 'store/eventsSlice'

type DayCellProps = {
  day: Moment
  events: Event[] | undefined
  refetch: () => void
}

export const DayCell: FC<DayCellProps> = ({ day, events, refetch }) => {
  const { isOpen, onToggle, onClose } = useDisclosure()

  return (
    <>
      <Button
        px={1}
        minW='auto'
        onClick={onToggle}
        rightIcon={events && events.length > 0 ? <FaEllipsisV /> : <></>}
        variant={
          moment().format('DDMMYYYY') === day.format('DDMMYYYY') ? 'solid' : 'ghost'
        }
        colorScheme={
          moment().format('DDMMYYYY') === day.format('DDMMYYYY')
            ? 'red'
            : events && events?.length > 0
            ? 'green'
            : 'gray'
        }
        size='sm'>
        {day.format('D')}
      </Button>
      {isOpen && (
        <Popover
          returnFocusOnClose={false}
          isOpen={isOpen}
          onClose={onClose}
          placement='right'
          closeOnBlur={false}>
          <EventPopover
            isOpen={isOpen}
            onClose={onClose}
            day={day}
            events={events}
            refetch={refetch}
          />
        </Popover>
      )}
    </>
  )
}
