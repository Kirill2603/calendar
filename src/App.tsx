import React from 'react'
import { useAppSelector } from './store/store'
import { Calendar } from './components/Calendar'
import { Navigate } from './components/Navigate'
import { Header } from './components/Header'
import { YearView } from './components/YearView/YearView'


export const App = () => {


  const { calendarActiveDate, activeView } = useAppSelector(state => state.calendar)
  const startOfWeek = calendarActiveDate.clone().startOf('month').startOf('week')

  return (
    <>
      <Header activeView={activeView}/>
      {activeView === 'month' && <>
        <Navigate calendarActiveDate={calendarActiveDate}/>
        <Calendar startOfWeek={startOfWeek} calendarActiveDate={calendarActiveDate}/>
      </>}
      {activeView === 'year' && <>
        <YearView calendarActiveDate={calendarActiveDate}/>
      </>}

    </>
  )
}
