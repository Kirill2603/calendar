import React, { FC } from 'react'
import { Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import moment, { Moment } from 'moment'

type MonthCellProps = {
  calendarActiveDate: Moment
  month: string
}

export const MonthCell: FC<MonthCellProps> = ({calendarActiveDate, month}) => {

  let firstDay = 1
  const dayNames = [...Array(7)].map(() => moment().day(firstDay++).format('dd'))
  const startOfMonth = moment().month(month).startOf('month').startOf('week')
  const day = startOfMonth.clone().subtract(1, 'day')
  const daysOfMonth = [...Array(42)].map(() => day.add(1, 'day').clone())


  return (
    <GridItem>
      <Heading p={4} size='lg'>{month}</Heading>
      <Grid
        height='full'
        templateRows='auto repeat(6, 1fr)'
        templateColumns='repeat(7, 1fr)'
        justifyContent='end'
        alignContent='end'
        alignItems='end'
        gap='1'
        >
          {dayNames.map(dayName =>
            <Flex as={GridItem} fontWeight='bold' justifyContent='end' key={dayName}>{dayName}</Flex>
          )}
          {daysOfMonth.map(day =>
            <Flex
              as={GridItem}
              justifyContent='end'
              key={day.format('DDMMYYY')}
              backgroundColor={calendarActiveDate.format('DDMMYYYY') === day.format('DDMMYYYY') ? 'red' : ''}
              >
              {day.format('MMMM') === month ? day.format('D') : ''}
            </Flex>)}
      </Grid>
    </GridItem>
  )
}
