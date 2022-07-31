import React, { FC } from 'react'
import { setMonth } from '../../../store/calendarSlice'
import { useAppDispatch } from '../../../store/store'
import { Dayjs } from 'dayjs'
import styles from './MonthNav.module.css'

type MonthNavProps = {
  activeDate: Dayjs
}

const MonthNav: FC<MonthNavProps> = ({activeDate}) => {

  const dispatch = useAppDispatch()

  const onSetMonth = (type: 'today' | 'next' | 'prev') => {
    dispatch(setMonth(type))
  }

  return (
    <div className={styles.monthNav}>
      <h2 className={styles.date}>{activeDate.format('MMMM 2022')}</h2>
      <nav className={styles.buttonBlock}>
        <button onClick={() => onSetMonth('prev')}>{'<'}</button>
        <button onClick={() => onSetMonth('today')}>today</button>
        <button onClick={() => onSetMonth('next')}>{'>'}</button>
      </nav>
    </div>
  )
}

export default MonthNav