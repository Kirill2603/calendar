import React, { FC, useState } from 'react'
import { Badge, Button, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { Event } from '../store/eventsSlice'
import moment, { Moment } from 'moment'
import { EventPopover } from './EventPopover'

type CalendarCellProps = {
  day: Moment
  events: Event[] | undefined
  isThisMonth: boolean
  isActiveDay: boolean
  isDayOff: boolean
  refetch: () => void
}

export const CalendarCell: FC<CalendarCellProps> = ({ day,
                                                      events,
                                                      isThisMonth,
                                                      isActiveDay,
                                                      isDayOff,
                                                      refetch }) => {

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
          {isOpen && <EventPopover isOpen={isOpen} onClose={onClose} day={day} events={events} refetch={refetch}/>}
      </Flex>
      <Flex
        direction='column'
        justify='flex-start'>
        {events?.map(event =>
          <Badge variant='subtle' fontSize='0.9rem' px={2} ml={1} my={0.5} key={event._id} colorScheme={event.color}>{event.title}</Badge>,
        )}
      </Flex>
    </Flex>
  )
}
