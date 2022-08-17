import React, { FC } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Event } from 'store/types'
import { DayOfYear } from './DayOfYear'

type MonthCellProps = {
  month: Dayjs
  events: Event[] | undefined
  refetch: () => void
}

export const MontCell: FC<MonthCellProps> = ({ month, events, refetch }) => {

  const starOfMonthGrid = dayjs(month).startOf('month').startOf('week')
  const monthDays = [...Array(42)].map((day, index) => starOfMonthGrid.add(index++, 'day').clone())
  const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  return (
    <li className='w-fit'>
      <span className='text-red-500 font-bold px-2 text-lg'>{dayjs(month).format('MMMM')}</span>
      <ul className='grid grid-cols-7 text-center gap-1 w-full py-2 font-semibold'>
        {dayNames.map((dayName, index) =>
          <li
            key={dayName + index}
            className='px-2 py-1 text-neutral-600'>
            {dayName}
          </li>)}
      </ul>
      <ul className='grid grid-cols-7 items-center align-middle justify-center'>
        {monthDays.map(monthDay =>
          <DayOfYear
            key={monthDay.unix() + 'mm'}
            monthDay={monthDay}
            month={month}
            refetch={refetch}
            dayEvents={events?.filter(event => dayjs(event.date).isSame(monthDay, 'day'))} />)}
      </ul>
    </li>
  )
}
