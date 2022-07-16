import React from 'react'
import { Header } from './components/Header'
import { Navigate } from './components/Navigate'
import { Calendar } from './components/Calendar'
import { createGlobalStyle } from 'styled-components'
import { useGetEventsQuery } from './store/eventsSlice'
import { useAppDispatch, useAppSelector } from './store/store'
import { setActiveDate } from './store/calendarSlice'

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

  // const {data, error,  isLoading} = useGetEventsQuery()

  const startOfWeek = activeDate.clone().startOf('month').startOf('week')

  const onSetMonth = (type: 'next' | 'prev' | 'today') => {
    dispatch(setActiveDate({ type }))
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
