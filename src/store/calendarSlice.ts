import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { CalendarState } from './types'

const getDaysForMonth = (month: number) => {
  const starOfMonthGrid = dayjs().set('date', 1).set('month', month).startOf('week').add(1, 'day').clone()
  let i = 0
  return [...Array(42)].map(() => starOfMonthGrid.add(i++, 'day'))
}

const initialState: CalendarState = {
  today: dayjs(),
  activeView: 'month',
  calendarActiveDate: dayjs().clone(),
  miniCalendarActiveDate: dayjs().clone(),
  calendarMonthDays: getDaysForMonth(dayjs().get('month')),
  miniCalendarMonthDays: getDaysForMonth(dayjs().get('month')),
  isAdditionalPanelShow: true
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCalendarMonth: (state, action: PayloadAction<{ target: 'calendar' | 'miniCalendar', action: 'next' | 'prev' | 'today' }>) => {
      if (action.payload.action === 'today') {
        if (action.payload.target === 'calendar') {
          state.calendarActiveDate = dayjs()
          state.calendarMonthDays = getDaysForMonth(state.calendarActiveDate.get('month'))
        } else {
          state.miniCalendarActiveDate = dayjs()
          state.miniCalendarMonthDays = getDaysForMonth(state.miniCalendarActiveDate.get('month'))
        }
      }
      if (action.payload.action === 'next') {
        if (action.payload.target === 'calendar') {
          state.calendarActiveDate = state.calendarActiveDate.add(1, 'month').clone()
          state.calendarMonthDays = getDaysForMonth(state.calendarActiveDate.get('month'))
        } else {
          state.miniCalendarActiveDate = state.miniCalendarActiveDate.add(1, 'month').clone()
          state.miniCalendarMonthDays = getDaysForMonth(state.miniCalendarActiveDate.get('month'))
        }
      }
      if (action.payload.action === 'prev') {
        if (action.payload.target === 'calendar') {
          state.calendarActiveDate = state.calendarActiveDate.add(-1, 'month').clone()
          state.calendarMonthDays = getDaysForMonth(state.calendarActiveDate.get('month'))
        } else {
          state.miniCalendarActiveDate = state.miniCalendarActiveDate.add(-1, 'month').clone()
          state.miniCalendarMonthDays = getDaysForMonth(state.miniCalendarActiveDate.get('month'))
        }
      }
    },
    setActiveView: (state, action: PayloadAction<'month' | 'year'>) => {
      state.activeView = action.payload
    },
    setAdditionalPanelShow: (state, action:PayloadAction<boolean>) => {
      state.isAdditionalPanelShow = action.payload
    }
  },

})

export const { setCalendarMonth, setActiveView, setAdditionalPanelShow } = calendarSlice.actions
