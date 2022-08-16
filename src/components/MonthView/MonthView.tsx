import React, { FC } from 'react'
import { useAppSelector } from 'store/store'
import { Navigate } from '../Navigate'
import { useGetEventsForMonthQuery } from '../../store/eventsSlice'
import { DayCell } from './Daycell'
import { Dayjs } from 'dayjs'

type MonthViewProps = {
  today: Dayjs
  calendarActiveDate: Dayjs
  calendarMonthDays: Dayjs[]
}
export const MonthView: FC<MonthViewProps> = ({ today, calendarActiveDate, calendarMonthDays }) => {

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const { data: events } = useGetEventsForMonthQuery({ start: calendarMonthDays[0], end: calendarMonthDays[41] })

  return (
    <main className='flex flex-col justify-start h-full w-full'>
      <Navigate type='month' calendarActiveDate={calendarActiveDate} />
      <ul className='grid grid-cols-7 border-b border-neutral-500 py-2'>{dayNames.map(day =>
        <li key={day} className='flex flex-row justify-end bg-neutral-800 px-2 text-xl font-bold'>
          {day}
        </li>)}
      </ul>
      <ul className='grid grid-cols-7 grid-rows-6 gap-px bg-neutral-500 h-full'>
        {calendarMonthDays.map((day) =>
          <DayCell
            key={day.unix()}
            day={day}
            calendarActiveDate={calendarActiveDate}
            today={today}
            events={events?.filter(event => day.isSame(event.date, 'date'))} />,
        )}
      </ul>
    </main>
  )
}
