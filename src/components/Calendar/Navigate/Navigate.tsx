import React, { FC } from 'react'
import styled from 'styled-components'
import { Moment } from 'moment'
import { DateNow, NavigateBlock } from './Navigate.styles'

type NavigateProps = {
  activeDate: Moment
  onSetMonth: (type: 'next' | 'prev' | 'today') => void
}

const NavButtonBlock = styled.div`
  > button {
    font-size: 1.1rem;
    cursor: pointer;
    background-color: #57585a;
    border: 0;
    border-radius: 4px; 
    color: white;
    margin-left: 1px;
    padding: 1px 7px 1px 7px ;
    box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.64);
  }
`

export const Navigate: FC<NavigateProps> = ({activeDate, onSetMonth}) => {
  return (
    <NavigateBlock>
      <DateNow><b>{activeDate.format('MMMM')}</b> {activeDate.format('YYYY')}</DateNow>
      <NavButtonBlock>
        <button type='button' onClick={() => onSetMonth('prev')}>{'<'}</button>
        <button type='button' onClick={() => onSetMonth('today')}>Today</button>
        <button type='button' onClick={() => onSetMonth('next')}>{'>'}</button>
      </NavButtonBlock>
    </NavigateBlock>
  )
}
