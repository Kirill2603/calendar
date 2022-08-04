import React, { FC } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { useGetEventsForMonthQuery } from '../../../store/eventsSlice'
import DayCell from './Daycell'

type MonthGridProps = {
  today: Dayjs
  activeDate: Dayjs
  monthDays: Dayjs[]
}

const MonthGrid: FC<MonthGridProps> = ({ today, activeDate, monthDays }) => {

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const { data: events } = useGetEventsForMonthQuery({ start: monthDays[0], end: monthDays[41] })

  return (
    <>
      <ul className='grid grid-cols-7 border-b border-neutral-500 py-2'>{dayNames.map(day =>
        <li key={day} className='flex flex-row justify-end bg-neutral-800 px-2 text-xl font-bold'>
          {day}
        </li>)}
      </ul>
      <ul className='grid grid-cols-7 grid-rows-6 gap-px bg-neutral-500 h-full'>
        {monthDays.map((day) =>
            <DayCell
              key={day.unix()}
              day={day}
              activeDate={activeDate}
              today={today}
              events={events?.filter(event => day.isSame(event.date, 'date'))} />
        )}
      </ul>

    </>
  )
}

export default MonthGrid
