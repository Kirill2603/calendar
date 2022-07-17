import React from 'react'
import { Navigate } from './components/Navigate'
import { Calendar } from './components/Calendar'
import { createGlobalStyle } from 'styled-components'
import { useAppDispatch, useAppSelector } from './store/store'
import { setActiveDate } from './store/calendarSlice'
import { logDOM } from '@testing-library/react'
import moment from 'moment'
import { useGetEventsForMonthQuery } from './store/eventsSlice'

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

  const dispatch = useAppDispatch()
  const { activeDate } = useAppSelector(state => state.calendar)

  const startOfWeek = activeDate.clone().startOf('month').startOf('week')

  const onSetMonth = (type: 'next' | 'prev' | 'today') => {
    dispatch(setActiveDate({ type }))
  }

  return (
    <>
      <GlobalStyle />
      {/*<Header />*/}
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
