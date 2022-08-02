import React, { FC, ReactElement } from 'react'

type ModalProps = {
  title?: string
  color?: 'red' | 'green' | 'blue' | 'purple' | 'orange' | 'yellow'
  onClose: () => void
  children: ReactElement
}

const Modal: FC<ModalProps> = ({ onClose, title, color, children }) => {

  const onClickOutside = () => {
    onClose()
  }

  return (
    <div
      onClick={onClickOutside}
      className='fixed top-0 left-0 w-screen h-screen bg-neutral-800 bg-opacity-30 z-20 flex flex-col justify-center items-center'>
      <div
        onClick={(event) => event.stopPropagation()}
        className='border border-neutral-500 bg-neutral-800 rounded min-w-fit min-h-fit block text-neutral-50 text-base'>
        <div className={`flex flex-row justify-between border-b border-neutral-500 px-2 bg-${color}-400`}>
          <span></span>
          <span>{title}</span>
          <button onClick={onClickOutside}>X</button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal