import React from 'react'
import dayjs from 'dayjs'
import MontCell from './MontCell'
import { Navigate } from '../Navigate'

export const YearView = () => {

  const months = [...Array(12)].map((month, index) => dayjs().month(index))

  return (
    <main className='w-full h-full flex flex-col'>
      <Navigate type='year' calendarActiveDate={dayjs()}/>
      <ul className='grid grid-cols-4 w-full h-full gap-5 px-5 items-center justify-items-center'>
        {months.map(month => <MontCell month={month}/>)}
      </ul>
    </main>
  )
}
