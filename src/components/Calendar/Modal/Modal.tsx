import React, { FC, ReactElement } from 'react'
import { ModalContent, ModalStyle } from './Modal.style'

type ModalProps = {
  isModalActive: boolean
  setIsModalActive: (isModalActive: boolean) => void
  children: ReactElement
}

export const Modal: FC<ModalProps> = ({ isModalActive, setIsModalActive, children }) => {

  const OnClickOutsideModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setIsModalActive(false)
  }

  return (
    <ModalStyle active={isModalActive} onClick={event => OnClickOutsideModal(event)}>
      <ModalContent onClick={(event) => event.stopPropagation()}>
        <button onClick={() => setIsModalActive(false)}>x</button>
        {children}
      </ModalContent>
    </ModalStyle>
  )
}
