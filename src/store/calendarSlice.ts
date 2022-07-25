import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment, { Moment } from 'moment'

moment.updateLocale('en', { week: { dow: 1 } })

type CalendarState = {
  calendarActiveDate: Moment
  miniCalendarActiveDate: Moment
  activeView: 'day' | 'week' | 'month' | 'year'
}

const initialState: CalendarState = {
  calendarActiveDate: moment(),
  miniCalendarActiveDate: moment(),
  activeView: 'month',
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setMonthCalendarActiveDate: (
      state,
      action: PayloadAction<{ type: 'next' | 'prev' | 'today' }>,
    ) => {
      if (action.payload.type === 'next') {
        state.calendarActiveDate = state.calendarActiveDate.clone().add(1, 'month')
      }
      if (action.payload.type === 'prev') {
        state.calendarActiveDate = state.calendarActiveDate.clone().subtract(1, 'month')
      }
      if (action.payload.type === 'today') {
        state.calendarActiveDate = moment()
      }
    },
    setYearCalendarActiveDate: (
      state,
      action: PayloadAction<{ type: 'next' | 'prev' | 'today' }>,
    ) => {
      if (action.payload.type === 'next') {
        state.calendarActiveDate = state.calendarActiveDate.clone().add(1, 'year')
      }
      if (action.payload.type === 'prev') {
        state.calendarActiveDate = state.calendarActiveDate.clone().subtract(1, 'year')
      }
      if (action.payload.type === 'today') {
        state.calendarActiveDate = moment()
      }
    },

    setMiniCalendarActiveDate: (
      state,
      action: PayloadAction<{ type: 'next' | 'prev' | 'today' }>,
    ) => {
      if (action.payload.type === 'next') {
        state.miniCalendarActiveDate = state.miniCalendarActiveDate
          .clone()
          .add(1, 'month')
      }
      if (action.payload.type === 'prev') {
        state.miniCalendarActiveDate = state.miniCalendarActiveDate
          .clone()
          .subtract(1, 'month')
      }
      if (action.payload.type === 'today') {
        state.miniCalendarActiveDate = moment()
      }
    },
    setActiveView: (
      state,
      action: PayloadAction<{ type: 'day' | 'week' | 'month' | 'year' }>,
    ) => {
      state.activeView = action.payload.type
    },
  },
})

export const {
  setMonthCalendarActiveDate,
  setYearCalendarActiveDate,
  setMiniCalendarActiveDate,
  setActiveView,
} = calendarSlice.actions
