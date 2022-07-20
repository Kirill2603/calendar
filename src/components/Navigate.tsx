import React, { FC } from 'react'
import { Button, ButtonGroup, Flex, IconButton, Heading } from '@chakra-ui/react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Moment } from 'moment'
import { useAppDispatch } from '../store/store'
import { setCalendarActiveDate } from '../store/calendarSlice'

type NavigateProps = {
  calendarActiveDate: Moment
}

export const Navigate: FC<NavigateProps> = ({calendarActiveDate}) => {

  const dispatch = useAppDispatch()

  const onSetMonth = (type: 'next' | 'prev' | 'today') => {
    dispatch(setCalendarActiveDate({ type }))
  }

  return (
    <Flex justify='space-between' align='center' px={2}>
      <Heading size='2xl'>{calendarActiveDate.format('MMMM YYYY')}</Heading>
      <nav>
        <ButtonGroup size='sm' isAttached variant='outline'>
          <IconButton
            onClick={() => onSetMonth('prev')}
            aria-label='prev'
            icon={<FaAngleLeft />}/>
          <Button onClick={() => onSetMonth('today')}>Cancel</Button>
          <IconButton
            onClick={() => onSetMonth('next')}
            aria-label='prev'
            icon={<FaAngleRight />}/>
        </ButtonGroup>
      </nav>
    </Flex>
  )
}
