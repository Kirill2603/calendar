import React from 'react'
import { useAppDispatch, useAppSelector } from 'store/store'
import { setMonth } from 'store/calendarSlice'
import MonthGrid from './MonthGrtid/MonthGrid'

const MonthView = () => {
  const dispatch = useAppDispatch()
  const { today, activeDate, monthDays } = useAppSelector(state => state.calendar)

  const onSetMonth = (type: 'today' | 'next' | 'prev') => {
    dispatch(setMonth(type))
  }

  return (
    <>
      <button onClick={() => onSetMonth('prev')}>prev</button>
      <button onClick={() => onSetMonth('today')}>today</button>
      <button onClick={() => onSetMonth('next')}>next</button>
      <div>{activeDate.format('MMMM 2022')}</div>
      <MonthGrid today={today} activeDate={activeDate} monthDays={monthDays} />
    </>


  )
}

export default MonthView