import React from 'react'
import { MonthView } from './components/MonthView/MonthView'
import { MiniCalendar } from './components/miniCalendar'
import { YearView } from './components/YearView/YearView'
import { Header } from './components/Header'

const App = () => {

  return (
      <div className='flex flex-col h-full w-full'>
        <Header />
        <div className='flex flex-row w-full h-full'>
          <MiniCalendar />
          {/*<MonthView />*/}
          <YearView />
        </div>
      </div>
  )
}

export default App