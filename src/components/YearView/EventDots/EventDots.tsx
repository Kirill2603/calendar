import { Event } from '../../../store/types'
import React, { FC } from 'react'
import styles from './EventDots.module.css'

type EventDotsProps = {
  events: Event[] | undefined
}
export const EventDots: FC<EventDotsProps> = ({ events}) => {


  return (
    <div className={styles.EventDots}>
      {events?.map(event =>
        <span
          className={`${styles.EventDot} ${styles[event.color]}` }
          key={event._id}>·</span>,
      )}
    </div>
  )
}