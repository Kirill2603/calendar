import React, { FC } from 'react'
import styled from 'styled-components'
import { Moment } from 'moment'

type NavigateProps = {
  today: Moment
  onSetMonth: (type: 'next' | 'prev' | 'today') => void
}

const NavigateBlock = styled.div`
  background-color: #1f2022;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
`

const DateNow = styled.span`
  color: #dddddd;
  font-size: 2.4rem;
`

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

export const Navigate: FC<NavigateProps> = ({today, onSetMonth}) => {
  return (
    <NavigateBlock>
      <DateNow><b>{today.format('MMMM')}</b> {today.format('YYYY')}</DateNow>
      <NavButtonBlock>
        <button type='button' onClick={() => onSetMonth('prev')}>prev</button>
        <button type='button' onClick={() => onSetMonth('today')}>Today</button>
        <button type='button' onClick={() => onSetMonth('next')}>next</button>
      </NavButtonBlock>
    </NavigateBlock>
  )
}
