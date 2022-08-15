import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { setCalendarMonth } from '../store/calendarSlice'

export const MiniCalendar = () => {
  const dispatch = useAppDispatch()
  const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const { today, miniCalendarActiveDate, miniCalendarMonthDays } = useAppSelector(state => state.calendar)

  const onSetMiniCalendarMonth = (type: 'today' | 'next' | 'prev') => {
    dispatch(setCalendarMonth({target: 'miniCalendar', action: type}))
  }

  return (
    <aside className='flex flex-col justify-end border-r border-neutral-500'>
      <nav className='flex flex-row justify-between border-t border-neutral-500 py-2 px-3'>
        <button onClick={() => onSetMiniCalendarMonth('prev')}>{'<'}</button>
        <h3 className='font-semibold'>{miniCalendarActiveDate.format('MMMM')}</h3>
        <button  onClick={() => onSetMiniCalendarMonth('next')}>{'>'}</button>
      </nav>
      <ul className='grid grid-cols-7 text-center gap-1 w-max py-2 px-3 font-semibold'>
        {dayNames.map((dayName, index) =>
          <li
            key={dayName + index}
            className='px-2 py-1 text-neutral-600'>
            {dayName}
          </li>)}
        {miniCalendarMonthDays.map(day =>
          <li
            key={day.unix() + 'm'}
            className={`px-2 py-1 text-neutral-300
            ${day.isSame(today, 'day') ? 'bg-red-500 rounded-full text-neutral-900 ' : ''}
            ${!day.isSame(miniCalendarActiveDate, 'month') ? 'text-neutral-700' : ''}`}>
            {day.format('DD')}
          </li>)}
      </ul>
    </aside>

  )
}
