import { Button, ButtonGroup, Flex, Heading, IconButton } from '@chakra-ui/react'
import { Moment } from 'moment'
import React, { FC } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { setYearCalendarActiveDate } from 'store/calendarSlice'
import { useAppDispatch } from 'store/store'

type YearNavigateProps = {
  calendarActiveDate: Moment
}

export const YearNavigate: FC<YearNavigateProps> = ({ calendarActiveDate }) => {
  const dispatch = useAppDispatch()

  const onSetMonth = (type: 'next' | 'prev' | 'today') => {
    dispatch(setYearCalendarActiveDate({ type }))
  }

  return (
    <Flex justify='space-between' px={5} py={2}>
      <Heading>{calendarActiveDate.format('YYYY')} Year</Heading>
      <ButtonGroup size='sm' isAttached variant='outline'>
        <IconButton onClick={() => onSetMonth('prev')} aria-label='prev' icon={<FaAngleLeft />} />
        <Button onClick={() => onSetMonth('today')}>{calendarActiveDate.format('YYYY')}</Button>
        <IconButton onClick={() => onSetMonth('next')} aria-label='prev' icon={<FaAngleRight />} />
      </ButtonGroup>
    </Flex>
  )
}
