import React, { FC, useState } from 'react'
import moment, { Moment } from 'moment'
import { useGetEventsForMonthQuery } from '../../store/eventsSlice'
import { CalendarGrid, DayCell } from './Calendar.styles'
import { Navigate } from './Navigate/Navigate'
import { DateCell } from './DateCell'


type CalendarProps = {
  startOfWeek: Moment
  activeDate: Moment
  onSetMonth: (type: 'next' | 'prev' | 'today') => void
}


export const Calendar: FC<CalendarProps> = ({ startOfWeek, activeDate, onSetMonth }) => {

  const totalDays = 42
  const day = startOfWeek.clone().subtract(1, 'day')
  const daysArray: Moment[] = [...Array(totalDays)].map(() => day.add(1, 'day').clone())
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const { data, isLoading, isError } = useGetEventsForMonthQuery({ start: daysArray[0], end: daysArray[41] })

  const [isMenuActive, setIsMenuActive] = useState<boolean>(false)

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <Navigate
        activeDate={activeDate}
        onSetMonth={onSetMonth}
      />
      <CalendarGrid>
        {daysOfWeek.map((day) => <DayCell key={day}>{day}</DayCell>)}
        {daysArray.map((day) =>
          <DateCell
            day={day}
            key={day.unix().toString()}
            activeDate={activeDate}
            dayEvents={data && data
              .filter(event => moment(event.date).format('DD-MM-YYYY') === day.format('DD-MM-YYYY'))
          }
            />)}
      </CalendarGrid>
    </div>
  )
}
