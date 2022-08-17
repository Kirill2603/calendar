import React, { FC } from 'react'
import { Navigate } from '../Navigate'
import { useGetEventsForMonthQuery } from '../../store/eventsSlice'
import { DayCell } from './Daycell'
import dayjs, { Dayjs } from 'dayjs'
import { LinearLoader } from '../UI/Loaders/LinearLoader/LinearLoader'
import { WeatherResponse } from '../../store/weatherSlice'

type MonthViewProps = {
  today: Dayjs
  calendarActiveDate: Dayjs
  weather: WeatherResponse | undefined
}
export const MonthView: FC<MonthViewProps> = ({ today, calendarActiveDate ,weather}) => {

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const starOfMonthGrid = calendarActiveDate.startOf('month').startOf('week')
  const monthDays = [...Array(42)].map((day, index) => starOfMonthGrid.add(index++, 'day').clone())
  const { data: events, refetch, isLoading } = useGetEventsForMonthQuery({ start: monthDays[0], end: monthDays[41] })

  return (
    <>
      {isLoading && <LinearLoader />}
      <main className='flex flex-col justify-start h-full w-full'>
        <Navigate type='month' calendarActiveDate={calendarActiveDate} />
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
              calendarActiveDate={calendarActiveDate}
              today={today}
              weatherForDay={weather?.list.filter(weatherItem => dayjs(weatherItem.dt*1000).isSame(day, 'date'))}
              refetch={refetch}
              events={events?.filter(event => day.isSame(event.date, 'date'))} />,
          )}
        </ul>
      </main>
    </>

  )
}
