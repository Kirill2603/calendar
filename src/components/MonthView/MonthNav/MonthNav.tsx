import React, { FC } from 'react'
import { setMonth } from '../../../store/calendarSlice'
import { useAppDispatch } from '../../../store/store'
import { Dayjs } from 'dayjs'

type MonthNavProps = {
  activeDate: Dayjs
}

const MonthNav: FC<MonthNavProps> = ({activeDate}) => {

  const dispatch = useAppDispatch()

  const onSetMonth = (type: 'today' | 'next' | 'prev') => {
    dispatch(setMonth(type))
  }

  return (
    <div className='flex flex-row justify-between p-4'>
      <h2 className='text-4xl'>{activeDate.format('MMMM 2022')}</h2>
      <nav >
        <button
          className='px-2 mx-0.5 border border-neutral-900 rounded bg-neutral-500 shadow-sm shadow-neutral-900'
          onClick={() => onSetMonth('prev')}>{'<'}</button>
        <button
          className='px-2 mx-0.5 border border-neutral-900 rounded bg-neutral-500 shadow-sm shadow-neutral-900'
          onClick={() => onSetMonth('today')}>today</button>
        <button
          className='px-2 mx-0.5 border border-neutral-900 rounded bg-neutral-500 shadow-sm shadow-neutral-900'
          onClick={() => onSetMonth('next')}>{'>'}</button>
      </nav>
    </div>
  )
}

export default MonthNav