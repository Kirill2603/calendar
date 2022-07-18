import React, { FC, ReactElement } from 'react'
import { ModalContent, ModalStyle } from './Modal.style'

type ModalProps = {
  active: boolean
  setActive: (active: boolean) => void
}

export const Modal: FC<ModalProps> = ({ active, setActive }) => {

  const OnClickOutsideModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setActive(false)
  }

  return (
    <ModalStyle active={active} onClick={event => OnClickOutsideModal(event)}>
      <ModalContent onClick={(event) => event.stopPropagation()}>
        <button onClick={() => setActive(false)}>x</button>
        <div>asd</div>
      </ModalContent>
    </ModalStyle>
  )
}
