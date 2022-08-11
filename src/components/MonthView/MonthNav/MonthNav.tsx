import React, { FC } from 'react'
import { setMonth } from '../../../store/calendarSlice'
import { useAppDispatch } from '../../../store/store'
import { Dayjs } from 'dayjs'
import { Button } from 'components/UI'

type MonthNavProps = {
  activeDate: Dayjs
}

export const MonthNav: FC<MonthNavProps> = ({ activeDate }) => {

  const dispatch = useAppDispatch()

  const onSetMonth = (type: 'today' | 'next' | 'prev') => {
    dispatch(setMonth(type))
  }

  return (
    <div className='flex flex-row justify-between p-4'>
      <span className='flex flex-row'>
        <h2 className='text-5xl font-bold pr-4'>{activeDate.format('MMMM')}</h2>
        <h2 className='text-5xl'>{activeDate.format('YYYY')}</h2>
      </span>
      <nav className=''>
        <Button
          onClick={() => onSetMonth('prev')}>{'<'}</Button>
        <Button
          onClick={() => onSetMonth('today')}>today</Button>
        <Button
          onClick={() => onSetMonth('next')}>{'>'}</Button>
      </nav>
    </div>
  )
}