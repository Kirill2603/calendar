import React, { ChangeEvent, FC } from 'react'
import { Priorities } from 'store/types'

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
        className='flex flex-col w-full'>
        <input
          type='range'
          value={priority}
          onChange={event => onChangePriority(event)}
          className='w-full'
          min='0' max='2' step='1' />
        <ul className='flex justify-between w-full'>
          <li className='flex justify-center'><span className={priority === 0 ? 'text-green-600' : ''}>Low</span></li>
          <li className='flex justify-center'><span className={priority === 1 ? 'text-yellow-600' : ''}>Middle</span></li>
          <li className='flex justify-center'><span className={priority === 2 ? 'text-red-600' : ''}>High</span></li>
        </ul>
      </div>
    </>
  )
}
