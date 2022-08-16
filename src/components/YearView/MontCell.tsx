import React, { FC } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { getDaysForMonth } from '../../store/calendarSlice'


type MonthCellProps = {
  today: Dayjs
  month: Dayjs
}

const MontCell: FC<MonthCellProps> = ({ today, month }) => {

  const starOfMonthGrid = dayjs(month).startOf('month').startOf('week').add(1,'day')
  const monthDays = [...Array(42)].map((day, index) => starOfMonthGrid.add(index++, 'day'))

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
      <ul className='grid grid-cols-7 justify-items-center'>
        {monthDays.map(day =>
          <li
            key={day.unix() + 'm'}
            className={`text-neutral-300 leading-tight font-bold py-0.5 px-0.5
            ${day.isSame(today, 'day') && 'bg-red-500 rounded-full text-neutral-900'}
            ${!day.isSame(dayjs(month), 'month') && 'text-neutral-700'}
            `}>
            {day.format('D')}
          </li>)}
      </ul>
    </li>
  )
}

export default MontCell