import React, { FC } from 'react'
import styles from './Input.module.css'

type InputProps = {
  value: string | undefined
  placeholder?: string
  onChange?: (value: string) => void
}

export const Input: FC<InputProps> = ({ value, placeholder, onChange }) => {

  const onInputChange = (value: string) => {
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <input
      value={value || ''}
      onChange={(event) => onInputChange(event.currentTarget.value)}
      placeholder={placeholder}
      className={`${styles.Input}`}
      type='text' />
  )
}
