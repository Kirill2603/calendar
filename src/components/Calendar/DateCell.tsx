import React, { FC, useState } from 'react'
import { Date } from './Calendar.styles'
import moment, { Moment } from 'moment'
import { EventsList } from './EventsLists/EventsList'
import styled from 'styled-components'
import { Event } from '../../store/eventsSlice'
import { Menu } from '../Menu/Menu'

type DateCellProps = {
  day: Moment
  activeDate: Moment
  dayEvents: Event[] | undefined
}

export const DateCellStyle = styled.div<{ isWeekend: boolean, isThisMonth: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${props => props.isWeekend ? '#28282a' : '#1f2022'};
  color: ${props => props.isThisMonth ? '' : '#606062'};
  >div,ul{
    opacity: ${props => props.isThisMonth ? '' : 0.4}; !important;
  }
`

export const DateCell: FC<DateCellProps>  = ({day, dayEvents,activeDate}) => {

  const [ isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <DateCellStyle
      isThisMonth={day.format('MM') === activeDate.format('MM')}
      isWeekend={day.weekday() === 5 || day.weekday() === 6}
      key={day.format('DD-MM-YYYY')}
    >
      <Date
        today={day.format('DD-MM-YYYY') === moment().format('DD-MM-YYYY')}>
        <button onClick={() => {setIsMenuOpen(!isMenuOpen)}}>
          {day.format('DD') === '01' ? day.format('MMM ') : ''}
          {day.format('DD')}
        </button>
      </Date>
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      {dayEvents && <EventsList
        events={dayEvents
          .filter(event => moment(event.date)
            .format('DD-MM-YYYY') === day.format('DD-MM-YYYY'))}/>}
    </DateCellStyle>
  )
}
