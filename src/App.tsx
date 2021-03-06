import React from 'react'
import { Calendar } from './components/Calendar/Calendar'
import { useAppDispatch, useAppSelector } from './store/store'
import { CSSReset } from './GlobalStyles/CSSReset'
import { GlobalStyle } from './GlobalStyles/GlobalStyle'
import { Sidebar } from './components/Sidebar/Sidebar'
import styled from 'styled-components'
import { setCalendarActiveDate } from './store/calendarSlice'

const AppLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 100%;
`

export const App = () => {

  const dispatch = useAppDispatch()
  const { calendarActiveDate } = useAppSelector(state => state.calendar)

  const startOfWeek = calendarActiveDate.clone().startOf('month').startOf('week')

  const onSetMonth = (type: 'next' | 'prev' | 'today') => {
    dispatch(setCalendarActiveDate({ type }))
  }

  return (
    <>
      <GlobalStyle />
      <CSSReset />
      <AppLayout >
        <Sidebar/>
        <Calendar
          onSetMonth={onSetMonth}
          activeDate={calendarActiveDate}
          startOfWeek={startOfWeek}
        />
      </AppLayout>
    </>
  )
}
