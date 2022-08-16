import React, { FC } from 'react'
import { Button, Input } from './UI'
import { useAppDispatch } from '../store/store'
import { setActiveView, setAdditionalPanelShow } from '../store/calendarSlice'

type HeaderProps = {
  activeView: 'month' | 'year'
  isAdditionalPanelShow: boolean
}

export const Header: FC<HeaderProps> = ({ activeView, isAdditionalPanelShow }) => {
  const dispatch = useAppDispatch()

  const onSetActiveView = (view: 'month' | 'year') => {
    dispatch(setActiveView(view))
  }

  const onSetAdditionalPanel = (show: boolean) => {
    dispatch(setAdditionalPanelShow(show))
  }


  return (
    <header className='flex flex-row justify-between bg-neutral-700 p-2'>
      <Button onClick={() => onSetAdditionalPanel(!isAdditionalPanelShow)}>☰</Button>
      <div>
        <Button onClick={() => onSetActiveView('year')} active={activeView === 'year'}>Year</Button>
        <Button onClick={() => onSetActiveView('month')} active={activeView === 'month'}>Month</Button>
      </div>
      <Input value='' placeholder='Search' />
    </header>
  )
}
