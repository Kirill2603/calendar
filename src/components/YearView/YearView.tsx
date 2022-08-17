import React, { FC } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { MontCell } from './MontCell'
import { Navigate } from '../Navigate'
import { useGetAllEventsQuery } from '../../store/eventsSlice'

type YearViewProps = {
  calendarActiveDate: Dayjs
}

export const YearView: FC<YearViewProps> = ({ calendarActiveDate }) => {

  const months = [...Array(12)].map((month, index) => calendarActiveDate.set('month', index).clone())
  const { data, refetch } = useGetAllEventsQuery()

  return (
    <main className='w-full h-full flex flex-col'>
      <Navigate type='year' calendarActiveDate={calendarActiveDate} />
      <ul className='grid grid-cols-4 w-full h-full gap-5 px-5 items-center justify-items-center'>
        {months.map(month =>
          <MontCell
            key={month.unix()}
            month={month}
            refetch={refetch}
            events={data?.filter(event => dayjs(event.date).isSame(month, 'month'))} />)}
      </ul>
    </main>
  )
}
