import React from 'react'
import { useAppSelector } from './store/store'
import { MonthView } from './components/MonthView/MonthView'
import { MonthNavigaete } from './components/MonthView/MonthNavigaete'
import { Header } from './components/Header'
import { YearView } from './components/YearView/YearView'

export const App = () => {
  const { calendarActiveDate, activeView } = useAppSelector(state => state.calendar)
  

  return (
    <>
      <Header activeView={activeView} />
      {activeView === 'month' && (
        <>
          <MonthNavigaete calendarActiveDate={calendarActiveDate} />
          <MonthView calendarActiveDate={calendarActiveDate} />
        </>
      )}
      {activeView === 'year' && (
        <>
          <YearView calendarActiveDate={calendarActiveDate} />
        </>
      )}
    </>
  )
}
