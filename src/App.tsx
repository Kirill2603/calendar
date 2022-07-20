import React from 'react'
import { useAppSelector } from './store/store'
import { Calendar } from './components/Calendar'
import { Button, useColorMode } from '@chakra-ui/react'
import { Navigate } from './components/Navigate'


export const App = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const { calendarActiveDate } = useAppSelector(state => state.calendar)

  const startOfWeek = calendarActiveDate.clone().startOf('month').startOf('week')

  return (
    <>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
      <Navigate calendarActiveDate={calendarActiveDate}/>
      <Calendar startOfWeek={startOfWeek} calendarActiveDate={calendarActiveDate}/>
    </>
  )
}
