import React, { FC } from 'react'
import { MiniCalendarDate, MiniCalendarNavigate, MiniCalendarGrid } from './MiniCalendar.styles'
import { useAppDispatch, useAppSelector } from '../../store/store'
import moment, { Moment } from 'moment'
import { setMiniCalendarActiveDate } from '../../store/calendarSlice'

type MiniCalendarProps = {

}

export const MiniCalendar: FC<MiniCalendarProps> = () => {
  const dispatch = useAppDispatch()
  const { miniCalendarActiveDate } = useAppSelector(state => state.calendar)
  const startOfWeek = miniCalendarActiveDate.clone().startOf('month').startOf('week')
  const totalDays = 42
  const day = startOfWeek.clone().subtract(1, 'day')
  const daysArray: Moment[] = [...Array(totalDays)].map(() => day.add(1, 'day').clone())
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  const onSetMonth = (type: 'next' | 'prev' | 'today') => {
    dispatch(setMiniCalendarActiveDate({ type }))
  }

  return (
    <>
      <MiniCalendarNavigate>
        <button onClick={() => onSetMonth('prev')}>{'<'}</button>
        <p>{miniCalendarActiveDate.format('MMMM YYYY')}</p>
        <button onClick={() => onSetMonth('next')}>{'>'}</button>
      </MiniCalendarNavigate>
      <MiniCalendarGrid>
        {daysOfWeek.map((day, index) => <div className='weekDays' key={index}>{day}</div>)}
        {daysArray.map((date) =>
          <MiniCalendarDate
            key={date.format('DD-MM-YYYY')}
            isThisMonth={date.format('MM') === miniCalendarActiveDate.format('MM')}
            today={date.format('DD-MM-YYYY') === moment().format('DD-MM-YYYY')}>
            {date.format('DD')}
          </MiniCalendarDate>)}
      </MiniCalendarGrid>
    </>
  )
}
