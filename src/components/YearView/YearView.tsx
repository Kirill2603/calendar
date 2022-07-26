import React, { FC } from 'react'
import { Grid } from '@chakra-ui/react'
import moment, { Moment } from 'moment'
import { MonthCell } from './MonthCell'
import { YearNavigate } from './YearNavigate'
import { useGetAllEventsQuery } from 'store/eventsSlice'

type YearViewProps = {
  calendarActiveDate: Moment
}

export const YearView: FC<YearViewProps> = ({ calendarActiveDate }) => {
  let startMonth = 0
  const monthArray = [...Array(12)].map(() =>
    moment()
      .month(startMonth++)
      .format('MMMM'),
  )

  const { data, isError, isLoading, refetch } = useGetAllEventsQuery()

  return (
    <>
      <YearNavigate calendarActiveDate={calendarActiveDate} />
      <Grid
        px={5}
        height='full'
        w='full'
        justifyContent='center'
        alignContent='center'
        alignItems='center'
        templateRows='repeat(3, 1fr);'
        templateColumns='repeat(4, 1fr)'>
        {monthArray.map(month => (
          <MonthCell
            key={month}
            events={data?.filter(event => moment(event.date).format('MMMM') === month)}
            refetch={refetch}
            calendarActiveDate={calendarActiveDate}
            month={month}
          />
        ))}
      </Grid>
    </>
  )
}
