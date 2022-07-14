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
  font-size: 2rem;
`

const NavButtonBlock = styled.div`
  > button {
    background-color: #57585a;
    border: 0;
    border-radius: 3px;
    color: white;
    margin: 1px;
    padding: 3px 6px 3px 6px ;
  }
`

export const Navigate: FC<NavigateProps> = ({today, onSetMonth}) => {
  return (
    <NavigateBlock>
      <DateNow><b>{today.format('MMMM')}</b> {today.format('YYYY')}</DateNow>
      <NavButtonBlock>
        <button onClick={() => onSetMonth('prev')}>{'<'}</button>
        <button onClick={() => onSetMonth('today')}>Today</button>
        <button onClick={() => onSetMonth('next')}>{'>'}</button>
      </NavButtonBlock>
    </NavigateBlock>
  )
}
