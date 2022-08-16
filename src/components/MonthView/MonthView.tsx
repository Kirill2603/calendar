import React from 'react'
import { useAppSelector } from 'store/store'
import { Navigate } from '../Navigate'
import { MonthGrid } from './MonthGrid/MonthGrid'

export const MonthView = () => {

  const { today, calendarActiveDate, calendarMonthDays } = useAppSelector(state => state.calendar)

  return (
    <main className='flex flex-col justify-start h-full w-full'>
      <Navigate type='year' calendarActiveDate={calendarActiveDate}/>
      <MonthGrid today={today} calendarActiveDate={calendarActiveDate} calendarMonthDays={calendarMonthDays} />
    </main>
  )
}