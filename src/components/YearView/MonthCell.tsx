import React, { FC } from 'react'
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@chakra-ui/react'
import moment, { Moment } from 'moment'
import { Event } from 'store/eventsSlice'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { DayCell } from './DayCell'

type MonthCellProps = {
  calendarActiveDate: Moment
  month: string
  events: Event[] | undefined
  refetch: () => void
}

export const MonthCell: FC<MonthCellProps> = ({
  calendarActiveDate,
  month,
  events,
  refetch,
}) => {
  let firstDay = 1
  const dayNames = [...Array(7)].map(() =>
    moment()
      .day(firstDay++)
      .format('dd'),
  )
  const startOfMonth = moment()
    .year(Number(calendarActiveDate.format('YYYY')))
    .month(month)
    .startOf('month')
    .startOf('week')
  const day = startOfMonth.clone().subtract(1, 'day')
  const daysOfMonth = [...Array(42)].map(() => day.add(1, 'day').clone())

  return (
    <GridItem >
      <Heading size='lg'>{month}</Heading>
      <Grid
        height='full'
        width='fit-content'
        templateRows='auto repeat(6, 1fr)'
        templateColumns='repeat(7, 1fr)'
        >
        {dayNames.map(dayName => (
          <Flex as={GridItem} fontWeight='bold' justifyContent='start' key={dayName}>
            {dayName}
          </Flex>
        ))}
        {daysOfMonth.map(day =>
          day.format('MMMM') === month ? (
            <Flex as={GridItem} key={day.format('DDMMYYY')}>
              <DayCell
                refetch={refetch}
                day={day}
                events={events?.filter(
                  event =>
                    moment(event.date).format('DDMMYYYY') === day.format('DDMMYYYY'),
                )}
              />
            </Flex>
          ) : (
            <div key={day.format('DDMMYYY')}></div>
          ),
        )}
      </Grid>
    </GridItem>
  )
}
