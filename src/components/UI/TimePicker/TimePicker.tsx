import React, { FC, useLayoutEffect, useRef, useState } from 'react'
import styles from './TimePicker.module.css'
import dayjs, { Dayjs } from 'dayjs'

type TimePickerProps = {
  value: number | undefined
  onChange: (time: number) => void
}

export const TimePicker: FC<TimePickerProps> = ({ value, onChange }) => {

  const [width, setWidth] = useState(0)

  const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
  const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']

  const inputRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    if (inputRef.current) {
      setWidth(inputRef.current.offsetWidth)
    }
  }, [])

  const onSetTime = (time: Dayjs) => {
    onChange(time.unix() * 1000)
  }

  return (
    <>
      <div className={styles.time}>
        <input
          ref={inputRef}
          className={styles.timeInput}
          type='time' min='00:00' max='23:59'
          onChange={(event) => onSetTime(dayjs().clone()
            .hour(Number(event.target.value.substring(0, 2)))
            .minute(Number(event.target.value.substring(3, 5))))}
          value={dayjs(value).format('HH:mm')} />
        <div className={styles.dropdown} style={{ width: width }}>
        <ul className={styles.hours}>
          {hours.map(hour =>
            <li
              className={hour === dayjs(value).format('HH') ? styles.active : ''}
              onClick={() => onSetTime(dayjs(value).hour(Number(hour)))}
              key={hour}>{hour}</li>)}
        </ul>
        <ul className={styles.minutes}>
          {minutes.map(minute =>
            <li
              className={minute === dayjs(value).format('mm') ? styles.active : ''}
              onClick={() => onSetTime(dayjs(value).minute(Number(minute)))}
              key={minute}>{minute}</li>)}
        </ul>
        </div>
      </div>
    </>
  )
}
