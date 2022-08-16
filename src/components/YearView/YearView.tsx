import React, { FC } from 'react'
import { Dayjs } from 'dayjs'
import MontCell from './MontCell'
import { Navigate } from '../Navigate'

type YearViewProps = {
  today: Dayjs
  calendarActiveDate: Dayjs
}

export const YearView: FC<YearViewProps> = ({ today, calendarActiveDate }) => {

  const months = [...Array(12)].map((month, index) => calendarActiveDate.set('month', index).clone())

  return (
    <main className='w-full h-full flex flex-col'>
      <Navigate type='year' calendarActiveDate={calendarActiveDate} />
      <ul className='grid grid-cols-4 w-full h-full gap-5 px-5 items-center justify-items-center'>
        {months.map(month => <MontCell  today={today} month={month} />)}
      </ul>
    </main>
  )
}
