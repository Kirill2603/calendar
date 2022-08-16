import React from 'react'
import { MonthView } from './components/MonthView/MonthView'
import { MiniCalendar } from './components/miniCalendar'
import { YearView } from './components/YearView/YearView'
import { Header } from './components/Header'
import { useAppSelector } from './store/store'

const App = () => {

  const {
    calendarActiveDate,
    activeView,
    isAdditionalPanelShow,
    today,
    calendarMonthDays,
  } = useAppSelector(state => state.calendar)

  return (
    <div className='flex flex-col h-full w-full'>
      <Header activeView={activeView} isAdditionalPanelShow={isAdditionalPanelShow} />
      <div className='flex flex-row h-full w-full'>
        {isAdditionalPanelShow && <MiniCalendar />}
        {activeView === 'year' && <YearView today={today} calendarActiveDate={calendarActiveDate} />}
        {activeView === 'month' &&
          <MonthView today={today} calendarActiveDate={calendarActiveDate} calendarMonthDays={calendarMonthDays} />}
      </div>
    </div>
  )
}

export default App
