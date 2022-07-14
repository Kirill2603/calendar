import React, { FC } from 'react'
import styled from 'styled-components'
import moment, { Moment } from 'moment'

type CalendarProps = {
  startOfWeek: Moment
  activeDate: Moment
}

const CalendarGrid = styled.div`
  display: grid;
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
    box-shadow: 2px 0px 2px 0px #1f2022;
  }
`

const CellItem = styled.div<{ isWeekend: boolean }>`
  min-height: 120px;
  background-color: ${props => props.isWeekend ? '#28282a' : '#1f2022'};
    // color: ${props => props.isWeekend ? '#777779' : '#d7d7d9'};

  &:hover {
    background-color: #57585a;
  }
`

const Date = styled.div<{ today: boolean, isThisMonth: boolean }>`
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
    color: ${props => props.today ? 'black' : props.isThisMonth ? '' : '#606062'};
  }
`

export const Calendar: FC<CalendarProps> = ({ startOfWeek, activeDate }) => {
  const totalDays = 42
  const day = startOfWeek.clone().subtract(1, 'day')
  const daysArray: Moment[] = [...Array(totalDays)].map(() => day.add(1, 'day').clone())
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <CalendarGrid>
      {daysOfWeek.map((day) => <div className='weekDays' key={day}>{day}</div>)}
      {daysArray.map((dayItem) =>
        <CellItem
          isWeekend={dayItem.weekday() === 5 || dayItem.weekday() === 6}
          key={dayItem.format('DD-MM-YYYY')}
        >
          <Date
            today={dayItem.format('DDMMYYYY') === moment().format('DDMMYYYY')}
            isThisMonth={dayItem.format('MM') === activeDate.format('MM')}
          >
            <p>{dayItem.format('DD')}</p>
          </Date>
        </CellItem>)}
    </CalendarGrid>
  )
}
