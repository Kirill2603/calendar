import React, { ChangeEvent, FC } from 'react'
import { Priorities } from 'store/types'
import styles from './Priority.module.css'

type PriorityProps = {
  priority: Priorities | undefined
  onChange: (priority: Priorities) => void
}

export const Priority: FC<PriorityProps> = ({ priority, onChange }) => {

  const onChangePriority = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.currentTarget.value))
  }

  return (
    <>
      <div
        className={styles.Priority}>
        <input
          type='range'
          value={priority}
          onChange={event => onChangePriority(event)}
          className={styles.range}
          min='0' max='2' step='1' />
        <ul>
          <li><span className={`${priority === 0 && styles.low}`}>Low</span></li>
          <li><span className={`${priority === 1 && styles.middle}`}>Middle</span></li>
          <li><span className={`${priority === 2 && styles.high}`}>High</span></li>
        </ul>
      </div>
    </>
  )
}
