import React from 'react'
import { MonthView } from './components/MonthView/MonthView'
import { MiniCalendar } from './components/miniCalendar'
import { YearView } from './components/YearView/YearView'
import { Header } from './components/Header'
import { useAppSelector } from './store/store'

const App = () => {


  const { activeView } = useAppSelector(state => state.calendar)
  return (
    <div className='flex flex-col h-full w-full'>
      <Header activeView={activeView} />
      <div className='flex flex-row h-full w-full'>
        <MiniCalendar />
        {activeView === 'year' && <YearView />}
        {activeView === 'month' && <MonthView />}
      </div>
    </div>
  )
}

export default App