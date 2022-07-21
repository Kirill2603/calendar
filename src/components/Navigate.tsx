import React, { FC } from 'react'
import { Button, ButtonGroup, Flex, IconButton, Heading } from '@chakra-ui/react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Moment } from 'moment'
import { useAppDispatch } from '../store/store'
import { setCalendarActiveDate } from '../store/calendarSlice'

type NavigateProps = {
  calendarActiveDate: Moment
}

export const Navigate: FC<NavigateProps> = ({ calendarActiveDate }) => {

  const dispatch = useAppDispatch()

  const onSetMonth = (type: 'next' | 'prev' | 'today') => {
    dispatch(setCalendarActiveDate({ type }))
  }

  return (
    <Flex justify='space-between' align='center' px={2}>
      <Flex>
        <Heading size='2xl' pr={3}>{calendarActiveDate.format('MMMM ')}</Heading>
        <Heading size='2xl' fontWeight='normal'>{calendarActiveDate.format(' YYYY')}</Heading>
      </Flex>
      <nav>
        <ButtonGroup size='sm' isAttached variant='outline'>
          <IconButton
            onClick={() => onSetMonth('prev')}
            aria-label='prev'
            icon={<FaAngleLeft />} />
          <Button onClick={() => onSetMonth('today')}>Today</Button>
          <IconButton
            onClick={() => onSetMonth('next')}
            aria-label='prev'
            icon={<FaAngleRight />} />
        </ButtonGroup>
      </nav>
    </Flex>
  )
}
