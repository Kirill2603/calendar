import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { CalendarState } from './types'
import locale from 'dayjs/locale/en-gb'

dayjs.locale(locale)

export const getDaysForMonth = (month: number) => {
  const starOfMonthGrid = dayjs().set('date', 1).set('month', month).startOf('week')
  return [...Array(42)].map((day, index) => starOfMonthGrid.add(index++, 'day'))
}

const initialState: CalendarState = {
  today: dayjs(),
  activeView: 'month',
  calendarActiveDate: dayjs().clone(),
  miniCalendarActiveDate: dayjs().clone(),
  isAdditionalPanelShow: true,
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setViewDate: (state, action: PayloadAction<{ view: 'month' | 'year', action: 'next' | 'prev' | 'today' }>) => {
      if (action.payload.action === 'today') {
        if (action.payload.view === 'month') {
          state.calendarActiveDate = dayjs()
        } else {
          state.calendarActiveDate = dayjs()
        }
      }
      if (action.payload.action === 'next') {
        if (action.payload.view === 'month') {
          state.calendarActiveDate = state.calendarActiveDate.add(1, 'month')
        } else {
          state.calendarActiveDate = state.calendarActiveDate.add(1, 'year')
        }
      }
      if (action.payload.action === 'prev') {
        if (action.payload.view === 'month') {
          state.calendarActiveDate = state.calendarActiveDate.add(-1, 'month')
        } else {
          state.calendarActiveDate = state.calendarActiveDate.add(-1, 'year')
        }
      }
    },
    setMiniCalendarDate: (state, action: PayloadAction<'next' | 'prev'>) => {
      if (action.payload === 'prev') {
        state.miniCalendarActiveDate = state.miniCalendarActiveDate.add(-1, 'month')
      }
      if (action.payload === 'next') {
        state.miniCalendarActiveDate = state.miniCalendarActiveDate.add(1, 'month')
      }
    },
    setActiveView: (state, action: PayloadAction<'month' | 'year'>) => {
      state.activeView = action.payload
    },
    setAdditionalPanelShow: (state, action: PayloadAction<boolean>) => {
      state.isAdditionalPanelShow = action.payload
    },
  },

})

export const {  setActiveView, setViewDate, setAdditionalPanelShow, setMiniCalendarDate} = calendarSlice.actions
