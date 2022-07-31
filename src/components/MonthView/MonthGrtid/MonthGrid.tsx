import React, { FC } from 'react'
import { Dayjs } from 'dayjs'
import styles from  './MonthGrid.module.css'

type MonthGridProps = {
  today: Dayjs
  activeDate: Dayjs
  monthDays: Dayjs[]
}

const MonthGrid: FC<MonthGridProps> = ({ today, activeDate, monthDays }) => {
  return (
    <ul className={styles.monthGrid}>
      {monthDays.map((day) =>
        <li
          key={day.unix()}
          className={day.isSame(today, 'day') ? styles.today : ''}
        >
          {day.format('DD MMMM')}
        </li>,
      )}
    </ul>
  )
}

export default MonthGrid