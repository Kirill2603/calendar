import React, { FC, useState } from 'react'
import { Badge, Button, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { Event } from '../store/eventsSlice'
import moment, { Moment } from 'moment'
import { DatePopover } from './DatePopover'

type CalendarCellProps = {
  day: Moment
  events: Event[] | undefined
  isThisMonth: boolean
  isActiveDay: boolean
  isDayOff: boolean
}

export const CalendarCell: FC<CalendarCellProps> = ({ day, events, isThisMonth, isActiveDay, isDayOff }) => {

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
          // backgroundColor={isActiveDay ? '#f64733' : ''}
          // borderRadius={isActiveDay ? '4px' : ''}
          opacity={isThisMonth ? '' : '0.4'}
          onClick={onToggle}
          cursor='pointer'
          px={2}
          fontSize='2xl'>{moment(day).format('DD')}</Button>
        {isOpen && <DatePopover isOpen={isOpen} onClose={onClose} day={day} />}
      </Flex>
      <Flex
        direction='column'
        align='flex-start'
        justify='flex-start'>
        {events?.map(event =>
          <Badge key={event._id} colorScheme={event.color}>{event.title}</Badge>,
        )}
      </Flex>
    </Flex>
  )
}
