import React, { FC } from 'react'

type ButtonProps = {
  children: string
  colorScheme?: 'red' | 'green' | 'grey'
  onClick?: () => void
}

const Button:FC<ButtonProps> = ({children, colorScheme, onClick}) => {

  const style = {
    'red': 'border border-neutral-500 bg-red-500 rounded px-2 py-0.5 my-0.5 hover:bg-red-600 active:bg-red-400',
    'green': 'border border-neutral-500 bg-green-500 rounded px-2 py-0.5 my-0.5 hover:bg-green-600 active:bg-green-400',
    'grey': 'border border-neutral-500 bg-neutral-500 rounded px-2 py-0.5 my-0.5 hover:bg-neutral-600 active:bg-neutral-400',
  }

  const onButtonClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <button onClick={onButtonClick} className={colorScheme ? style[colorScheme] : style.grey}>
      {children}
    </button>
  )
}

export default Button