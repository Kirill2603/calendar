import React, { FC, useState } from 'react'
import moment, { Moment } from 'moment'
import { useGetEventsForMonthQuery } from '../../store/eventsSlice'
import { CalendarGrid, CellItem, Date, EventList } from './Calendar.styles'
import { Navigate } from './Navigate/Navigate'
import { EventElement } from './EventElement/EventElement'

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

  const [isModalActive, setIsModalActive] = useState<boolean>(false)

  return (
    <div  style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <Navigate
        activeDate={activeDate}
        onSetMonth={onSetMonth}
      />
      <CalendarGrid>
        {daysOfWeek.map((day) => <div className='weekDays' key={day}>{day}</div>)}
        {daysArray.map((dayItem) =>
          <CellItem
            isThisMonth={dayItem.format('MM') === activeDate.format('MM')}
            isWeekend={dayItem.weekday() === 5 || dayItem.weekday() === 6}
            key={dayItem.format('DD-MM-YYYY')}
          >
            <Date
              today={dayItem.format('DD-MM-YYYY') === moment().format('DD-MM-YYYY')}
            >
              <p>
                {dayItem.format('DD') === '01' ? dayItem.format('MMM ') : ''}
                {dayItem.format('DD')}
              </p>
            </Date>
            <EventList>
              {
                data && data.filter(event => moment(event.date).format('DD-MM-YYYY') === dayItem.format('DD-MM-YYYY'))
                  .map((event) =>
                    <EventElement
                      key={event._id}
                      isModalActive={isModalActive}
                      setIsModalActive={setIsModalActive}
                      event={event}/>
                  )
              }
            </EventList>
          </CellItem>)}
      </CalendarGrid>
    </div>
  )
}
