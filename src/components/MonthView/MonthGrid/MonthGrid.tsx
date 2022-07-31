import React, { FC } from 'react'
import { Dayjs } from 'dayjs'
import styles from './MonthGrid.module.css'

type MonthGridProps = {
  today: Dayjs
  activeDate: Dayjs
  monthDays: Dayjs[]
}

const MonthGrid: FC<MonthGridProps> = ({ today, activeDate, monthDays }) => {

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <>
      <ul className={styles.dayNames}>{dayNames.map(day => <li key={day} className={styles.dayCell}>{day}</li>)}</ul>
      <ul className={styles.monthGrid}>
        {monthDays.map((day) =>
          <li
            key={day.unix()}
            className={`
            ${!day.isSame(activeDate, 'month') ? styles.anotherMonth : ''}
            ${styles.cell} 
            ${(day.day() === 6 || day.day() === 0) ? styles.weekday : ''} 
            ${day.isSame(today, 'day') ? styles.today : ''}`}
          >
            {day.format('DD')}
          </li>,
        )}
      </ul>
    </>
  )
}

export default MonthGrid