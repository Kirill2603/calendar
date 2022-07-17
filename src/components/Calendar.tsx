import React, { FC } from 'react'
import styled from 'styled-components'
import moment, { Moment } from 'moment'
import { useGetEventsForMonthQuery } from '../store/eventsSlice'

type CalendarProps = {
  startOfWeek: Moment
  activeDate: Moment
}

const CalendarGrid = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 30px repeat(6, 1fr);
  background-color: rgba(38, 38, 38, 0.78);
  color: aliceblue;
  grid-gap: 1px;

  .weekDays {
    background-color: #1f2022;
    display: flex;
    justify-content: end;
    align-items: end;
    padding: 0.6rem;
    font-size: 1.2rem;
    box-shadow: 5px 0 0 0 #1f2022;
  }
`

const CellItem = styled.div<{ isWeekend: boolean, isThisMonth: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${props => props.isWeekend ? '#28282a' : '#1f2022'};
  color: ${props => props.isThisMonth ? '' : '#606062'};

  &:hover {
    background-color: #57585a;
  }
`

const Date = styled.div<{ today: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: end;
  font-size: 1.2rem;
  padding: 0.2rem;

  > p {
    font-weight: 600;
    background-color: ${props => props.today ? '#f04135' : ''};;
    border-radius: 50%;
    padding: 0.4rem;
    color: ${props => props.today ? 'black' : ''};
  }
`

const EventList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const EventElement = styled.li<{ eventColor: 'red' | 'green' | 'blue' | 'purple' | 'orange' | 'yellow' }>`
  width: 90%;
  margin: 0.2rem auto;
  background-color: ${props => props.eventColor};
  list-style: none;
  padding: 0.1rem 0.5rem 0.1rem 0.5rem;
  border-radius: 4px;
`

export const Calendar: FC<CalendarProps> = ({ startOfWeek, activeDate }) => {
  const totalDays = 42
  const day = startOfWeek.clone().subtract(1, 'day')
  const daysArray: Moment[] = [...Array(totalDays)].map(() => day.add(1, 'day').clone())
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']


  const { data, isLoading, isError } = useGetEventsForMonthQuery({ start: daysArray[0], end: daysArray[41] })

  return (
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
                    eventColor={event.color}>
                    {event.title}
                  </EventElement>)
            }
          </EventList>
        </CellItem>)}
    </CalendarGrid>
  )
}
