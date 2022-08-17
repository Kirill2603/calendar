import React from 'react'
import { MonthView } from './components/MonthView/MonthView'
import { MiniCalendar } from './components/miniCalendar'
import { YearView } from './components/YearView/YearView'
import { Header } from './components/Header'
import { useAppSelector } from './store/store'

const App = () => {

  const {
    calendarActiveDate,
    miniCalendarActiveDate,
    activeView,
    isAdditionalPanelShow,
    today,
  } = useAppSelector(state => state.calendar)

  return (
    <div className='flex flex-col h-full w-full'>
      <Header activeView={activeView} isAdditionalPanelShow={isAdditionalPanelShow} />
      <div className='flex flex-row h-full w-full'>
        {isAdditionalPanelShow && <MiniCalendar miniCalendarActiveDate={miniCalendarActiveDate}/>}
        {activeView === 'year' && <YearView calendarActiveDate={calendarActiveDate} />}
        {activeView === 'month' &&
          <MonthView today={today} calendarActiveDate={calendarActiveDate} />}
      </div>
    </div>
  )
}

export default App
