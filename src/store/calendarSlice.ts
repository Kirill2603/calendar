import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment, { Moment } from 'moment'

moment.updateLocale('en', { week: { dow: 1 } })

type CalendarState = {
  activeDate: Moment,
}

const initialState: CalendarState = {
  activeDate: moment(),
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setActiveDate: (state, action: PayloadAction<{type: 'next' | 'prev' | 'today'}>) => {
      if (action.payload.type === 'next') {
        state.activeDate = state.activeDate.clone().add(1, 'month')
      }
      if (action.payload.type === 'prev') {
        state.activeDate = state.activeDate.clone().subtract(1, 'month')
      }
      if (action.payload.type === 'today') {
        state.activeDate = moment()
      }
    }
  }
})

export const { setActiveDate } = calendarSlice.actions