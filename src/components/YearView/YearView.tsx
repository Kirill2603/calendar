import React, { FC } from 'react'
import { Grid } from '@chakra-ui/react'
import moment, { Moment } from 'moment'
import { MonthCell } from './MonthCell'
import { YearNavigate } from './YearNavigate'

type YearViewProps = {
  calendarActiveDate: Moment
}

export const YearView: FC<YearViewProps> = ({ calendarActiveDate }) => {

  let startMonth = 0
  const monthArray = [...Array(12)].map(() => moment().month(startMonth++).format('MMMM'))

  return (
    <>
      <YearNavigate calendarActiveDate={calendarActiveDate}/>
      <Grid
        px={5}
        height='full'
        justifyContent='center'
        alignContent='center'
        alignItems='center'
        gap='5'
        templateRows='repeat(3, 1fr);'
        templateColumns='repeat(4, 1fr)'>
        {monthArray.map(month => <MonthCell key={month} calendarActiveDate={calendarActiveDate} month={month}/>)}
      </Grid>
    </>
  )
}
