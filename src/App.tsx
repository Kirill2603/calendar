import React from 'react'
import { Navigate } from './components/Navigate/Navigate'
import { Calendar } from './components/Calendar/Calendar'
import { useAppDispatch, useAppSelector } from './store/store'
import { setActiveDate } from './store/calendarSlice'
import { CSSReset } from './GlobalStyles/CSSReset'
import { GlobalStyle } from './GlobalStyles/GlobalStyle'
import { Sidebar } from './components/Sidebar/Sidebar'
import styled from 'styled-components'

const AppLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 100%;
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
      <CSSReset />
      <Navigate
        today={activeDate}
        onSetMonth={onSetMonth}
      />
      <AppLayout >
        <Sidebar/>
        <Calendar
          activeDate={activeDate}
          startOfWeek={startOfWeek}
        />
      </AppLayout>
    </>
  )
}
