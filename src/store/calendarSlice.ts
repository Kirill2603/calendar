import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment, { Moment } from 'moment'

moment.updateLocale('en', { week: { dow: 1 } })

type CalendarState = {
  calendarActiveDate: Moment,
  miniCalendarActiveDate: Moment
}

const initialState: CalendarState = {
  calendarActiveDate: moment(),
  miniCalendarActiveDate: moment()
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCalendarActiveDate: (state, action: PayloadAction<{type: 'next' | 'prev' | 'today'}>) => {
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
    setMiniCalendarActiveDate: (state, action: PayloadAction<{type: 'next' | 'prev' | 'today'}>) => {
      if (action.payload.type === 'next') {
        state.miniCalendarActiveDate = state.miniCalendarActiveDate.clone().add(1, 'month')
      }
      if (action.payload.type === 'prev') {
        state.miniCalendarActiveDate = state.miniCalendarActiveDate.clone().subtract(1, 'month')
      }
      if (action.payload.type === 'today') {
        state.miniCalendarActiveDate = moment()
      }
    }
  }
})

export const { setCalendarActiveDate, setMiniCalendarActiveDate} = calendarSlice.actions
