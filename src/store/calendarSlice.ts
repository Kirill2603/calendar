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
  activeDate: dayjs().clone(),
  monthDays: getDaysForMonth(dayjs().get('month')),
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setMonth: (state, action: PayloadAction<'next' | 'prev' | 'today'>) => {
      if (action.payload === 'next') {
        console.log(state.activeDate)
        state.activeDate = state.activeDate.add(1, 'month').clone()
        state.monthDays = getDaysForMonth(state.activeDate.get('month'))
      }
      if (action.payload === 'prev') {
        state.activeDate = state.activeDate.add(-1, 'month').clone()
        state.monthDays = getDaysForMonth(state.activeDate.get('month'))
      }
      if (action.payload === 'today') {
        state.activeDate = dayjs()
        state.monthDays = getDaysForMonth(state.activeDate.get('month'))
      }
    },
  },
})

export const { setMonth } = calendarSlice.actions
