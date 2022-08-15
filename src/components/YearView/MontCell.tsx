import React, { FC } from 'react'
import dayjs, { Dayjs } from 'dayjs'


type MonthCellProps = {
  month: Dayjs
}

const MontCell: FC<MonthCellProps> = ({ month }) => {

  const fistDayOfMonth = dayjs(month).startOf('month').startOf('week')
  const monthDays = [...Array(42)].map((day, index) => fistDayOfMonth.add(index, 'day'))
  const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  return (
    <div className=''>
      <span className='text-red-400 font-bold px-2 text-lg'>{month.format('MMMM')}</span>
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
            className={`px-1 py-1 text-neutral-300 w-fit leading-tight
            ${day.isSame(dayjs(), 'day') ? 'bg-red-500 rounded-full text-neutral-900 ' : ''}
            ${!day.isSame(month, 'month') ? 'text-neutral-700' : ''}`}>
            {day.format('D')}
          </li>)}
      </ul>
    </div>
  )
}

export default MontCell