import React, { FC } from 'react'
import styled from 'styled-components'
import { Moment } from 'moment'

type CalendarProps = {
  startOfWeek: Moment
}

const CalendarGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  background-color: rgba(38, 38, 38, 0.78);
  color: aliceblue;
  grid-gap: 1px;
`

const CellItem = styled.div<{ isWeekend: boolean }>`
  min-height: 120px;
  background-color: ${props => props.isWeekend ? 'rgba(38,38,38,0.47)' : '#262626'}
  
`

const Date = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`

export const Calendar: FC<CalendarProps> = ({ startOfWeek }) => {
  const totalDays = 42
  const day = startOfWeek.clone().subtract(1, 'day')
  const daysArray: Moment[] = [...Array(totalDays)].map(() => day.add(1, 'day').clone())

  return (
    <CalendarGrid>
      {daysArray.map((dayItem, index) =>
        <CellItem
          isWeekend={dayItem.weekday() === 5 || dayItem.weekday() === 6}
          key={dayItem.format('DD-MM-YYYY')}
        >
          <Date>
            {dayItem.format('DD')}
          </Date>
        </CellItem>)}
    </CalendarGrid>
  )
}
