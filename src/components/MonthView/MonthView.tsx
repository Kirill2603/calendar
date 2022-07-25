import React, { FC } from 'react'
import { Text, Grid, GridItem, Flex } from '@chakra-ui/react'
import { useGetEventsForMonthQuery } from '../../store/eventsSlice'
import moment, { Moment } from 'moment'
import { MonthCell } from './MonthCell/MonthCell'

type MonthViewProps = {
  calendarActiveDate: Moment
}

export const MonthView: FC<MonthViewProps> = ({ calendarActiveDate }) => {

  const startOfWeek = calendarActiveDate.clone().startOf('month').startOf('week')
  const totalDays = 42
  const day = startOfWeek.clone().subtract(1, 'day')
  const daysArray: Moment[] = [...Array(totalDays)].map(() => day.add(1, 'day').clone())
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const { data, isLoading, isError, refetch } = useGetEventsForMonthQuery({
    start: daysArray[0],
    end: daysArray[41],
  })

  return (
    <Grid
      height='full'
      justifyContent='center'
      alignContent='center'
      alignItems='center'
      templateRows='auto repeat(6, 1fr);'
      templateColumns='repeat(7, 1fr)'
      gap='1px'>
      {daysOfWeek.map(dayName => (
        <GridItem height='full' width='full' key={dayName}>
          <Flex justify='end'>
            <Text p={2} fontSize='2xl'>
              {dayName}
            </Text>
          </Flex>
        </GridItem>
      ))}
      {daysArray.map(day => (
        <GridItem
          boxShadow='0px 0px 0px 1px #656565'
          height='full'
          width='full'
          key={day.unix()}>
          <MonthCell
            refetch={refetch}
            isDayOff={day.day() === 6 || day.day() === 0}
            isActiveDay={day.format('DDMMYYY') === moment().format('DDMMYYY')}
            isThisMonth={day.format('MM') === calendarActiveDate.format('MM')}
            day={day}
            events={
              data &&
              data.filter(
                event => moment(event.date).format('DDMMYYYY') === day.format('DDMMYYYY'),
              )
            }
          />
        </GridItem>
      ))}
    </Grid>
  )
}
