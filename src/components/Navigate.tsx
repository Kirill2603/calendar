import React, { FC } from 'react'
import { setViewDate } from '../store/calendarSlice'
import { useAppDispatch } from '../store/store'
import { Dayjs } from 'dayjs'
import { Button } from 'components/UI'

type MonthNavProps = {
  type: 'month' | 'year'
  calendarActiveDate: Dayjs
}

export const Navigate: FC<MonthNavProps> = ({ type, calendarActiveDate }) => {

  const dispatch = useAppDispatch()

  const onSetMonth = (action: 'today' | 'next' | 'prev') => {
    dispatch(setViewDate({view: type, action}))
  }

  return (
    <div className='flex flex-row justify-between p-2'>
      <span className='flex flex-row'>
        {type === 'month' && <h2 className='text-5xl font-bold pr-4'>{calendarActiveDate.format('MMMM')}</h2>}
        <h2 className='text-5xl'>{calendarActiveDate.format('YYYY')}</h2>
      </span>
      <nav className=''>
        <Button
          onClick={() => onSetMonth('prev')}>‹</Button>
        <Button
          onClick={() => onSetMonth('today')}>today</Button>
        <Button
          onClick={() => onSetMonth('next')}>›</Button>
      </nav>
    </div>
  )
}