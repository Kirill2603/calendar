import React from 'react'
import dayjs from 'dayjs'
import MontCell from './MontCell'

export const YearView = () => {

  const months = [...Array(12)].map((month, index) => dayjs().month(index))

  return (
    <main className='w-full h-full p-10'>
      <ul className='grid grid-cols-4 w-full h-full gap-10'>
        {months.map(month => <MontCell month={month}/>)}
      </ul>
    </main>
  )
}
