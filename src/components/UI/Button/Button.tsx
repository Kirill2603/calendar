import React, { FC } from 'react'
import styles from './Button.module.css'

type ButtonProps = {
  children: string
  colorScheme?: 'red' | 'green'
  active?: boolean
  onClick?: () => void
}

export const Button:FC<ButtonProps> = ({children, colorScheme, active,  onClick}) => {

  const onButtonClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <button
      onClick={onButtonClick}
      className={`${styles.Button} ${colorScheme && styles[colorScheme]} ${active && styles.active}`}>
      {children}
    </button>
  )
}
