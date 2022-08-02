import { Event } from 'store/eventsSlice'
import { Dayjs } from 'dayjs'
import React, { FC } from 'react'
import EventsList from './EventsList'

type DayCellProps = {
  events: Event[] | undefined
  day: Dayjs
  today: Dayjs
  activeDate: Dayjs
}

const DayCell: FC<DayCellProps> = ({ day, today, activeDate, events }) => {
  return (
    <li
      className={`bg-neutral-800 flex flex-col justify-start font-semibold w-full text-lg
            ${!day.isSame(activeDate, 'month') ? 'text-neutral-500' : ''}
            ${(day.day() === 6 || day.day() === 0) ? 'bg-neutral-700' : ''}`}
    >
      <div className='w-full flex flex-row justify-end'>
        <button
          className={`cursor-pointer p-2 m-1 leading-none ${day.isSame(today, 'day') ? 'bg-red-500 rounded-full text-neutral-800' : ''}`}>
          {day.format('DD')}
        </button>
      </div>
      <EventsList events={events} />
    </li>
  )
}

export default DayCell