import React from 'react'
import { MonthView } from './components/MonthView/MonthView'
import { MiniCalendar } from './components/miniCalendar'

const App = () => {

  return (
      <div className='flex flex-row w-full h-full'>
        <MiniCalendar />
        <MonthView />
      </div>
  )
}

export default App