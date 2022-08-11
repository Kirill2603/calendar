import React, { FC } from 'react'

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
      className='bg-neutral-800 border border-neutral-500 rounded py-0.5 outline-none my-0.5 w-full
      focus:ring-2 ring-indigo-500
      hover:border-neutral-400
      placeholder:text-neutral-400 px-2'
      type='text' />
  )
}
