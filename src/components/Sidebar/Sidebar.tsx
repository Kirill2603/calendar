import React from 'react'
import { SidebarStyles } from './Sidebar.styles'
import { MiniCalendar } from '../MiniCalendar/MiniCalendar'

export const Sidebar = () => {
  return (
    <SidebarStyles>
      <MiniCalendar />
    </SidebarStyles>
  )
}
