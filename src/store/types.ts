import { Dayjs } from 'dayjs'

export enum Priorities {
  'low' = 0,
  'middle' = 1,
  'high' = 2,
}

export enum Colors {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
  PURPLE = 'purple',
  ORANGE = 'orange',
  YELLOW = 'yellow',
}

export type Event = {
  _id: string,
  title: string,
  description?: string,
  is_done?: boolean,
  color: Colors
  priority: Priorities
  date: Date
  start?: Date
  end?: Date
}

export type UpdateEventModel = {
  _id: string,
  title: string,
  description?: string,
  is_done?: boolean,
  color?: Colors
  priority?: Priorities
  date: number
  start?: number
  end?: number
}

export type CreateEventModel = {
  title: string,
  description?: string,
  is_done?: boolean,
  color?: Colors
  priority?: Priorities
  date: number
  start?: number
  end?: number
}

export type CalendarState = {
  today: Dayjs
  calendarActiveDate: Dayjs
  miniCalendarActiveDate: Dayjs
  calendarMonthDays: Dayjs[]
  miniCalendarMonthDays: Dayjs[]
}