import React from 'react'
import moment from 'moment'
import { Header } from './components/Header'
import { Navigate } from './components/Navigate'
import { Calendar } from './components/Calendar'


moment.updateLocale('en', {week: {dow: 1}})
const startOfWeek = moment().startOf('month').startOf('week')
const endOfWeek = moment().endOf('month').endOf('week')

export const App = () => {
  return (
    <>
      <Header/>
      <Navigate />
      <Calendar
        startOfWeek={startOfWeek}
      />
    </>
  )
}
