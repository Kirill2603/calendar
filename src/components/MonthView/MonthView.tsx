import React from 'react'
import { useAppSelector } from 'store/store'

import MonthGrid from './MonthGrid/MonthGrid'
import MonthNav from './MonthNav/MonthNav'

const MonthView = () => {

  const { today, activeDate, monthDays } = useAppSelector(state => state.calendar)

  return (
    <main className='flex flex-col justify-start h-full'>
      <MonthNav activeDate={activeDate}/>
      <MonthGrid today={today} activeDate={activeDate} monthDays={monthDays} />
    </main>


  )
}

export default MonthView