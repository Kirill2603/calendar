import React from 'react'
import { useAppSelector } from './store/store'
import { Calendar } from './components/Calendar'
import { Navigate } from './components/Navigate'
import { Header } from './components/Header'


export const App = () => {


  const { calendarActiveDate } = useAppSelector(state => state.calendar)

  const startOfWeek = calendarActiveDate.clone().startOf('month').startOf('week')

  return (
    <>
      <Header />
      <Navigate calendarActiveDate={calendarActiveDate}/>
      <Calendar startOfWeek={startOfWeek} calendarActiveDate={calendarActiveDate}/>
    </>
  )
}
