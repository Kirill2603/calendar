import React, { FC } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { MontCell } from './MontCell'
import { Navigate } from '../Navigate'
import { useGetAllEventsQuery } from '../../store/eventsSlice'

type YearViewProps = {
  today: Dayjs
  calendarActiveDate: Dayjs
}

export const YearView: FC<YearViewProps> = ({ today, calendarActiveDate }) => {

  const months = [...Array(12)].map((month, index) => calendarActiveDate.set('month', index).clone())
  const { data } = useGetAllEventsQuery()

  return (
    <main className='w-full h-full flex flex-col'>
      <Navigate type='year' calendarActiveDate={calendarActiveDate} />
      <ul className='grid grid-cols-4 w-full h-full gap-5 px-5 items-center justify-items-center'>
        {months.map(month =>
          <MontCell
            key={month.unix()}
            today={today}
            month={month}
            events={data?.filter(event => dayjs(event.date).isSame(month, 'month'))} />)}
      </ul>
    </main>
  )
}
