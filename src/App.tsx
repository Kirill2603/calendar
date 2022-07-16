import React, { useState } from 'react'
import moment, { Moment } from 'moment'
import { Header } from './components/Header'
import { Navigate } from './components/Navigate'
import { Calendar } from './components/Calendar'
import { createGlobalStyle } from 'styled-components'
import { useGetEventsQuery } from './store/eventsSlice'

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Dialog, sans-serif;
    padding: 0;
    margin: 0;
  }
  #root {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
  }
`

export const App = () => {

  const {data, error,  isLoading} = useGetEventsQuery('')

  console.log(data)

  moment.updateLocale('en', { week: { dow: 1 } })
  const [activeDate, setActiveDate] = useState<Moment>(moment())
  const startOfWeek = activeDate.clone().startOf('month').startOf('week')

  const onSetMonth = (type: 'next' | 'prev' | 'today') => {
    if (type === 'next') {
      setActiveDate(activeDate.clone().add(1, 'month'))
    }
    if (type === 'prev') {
      setActiveDate(activeDate.clone().subtract(1, 'month'))
    }
    if (type === 'today') {
      setActiveDate(moment())
    }
  }

  return (
    <>
      <GlobalStyle />
      <Header />
      <Navigate
        today={activeDate}
        onSetMonth={onSetMonth}
      />
      <Calendar
        activeDate={activeDate}
        startOfWeek={startOfWeek}
      />
    </>
  )
}
