import React, { FC } from 'react'
import styled from 'styled-components'

type MenuProps = {
  isMenuOpen: boolean
  setIsMenuOpen: (isMenuOpen: boolean) => void
}

export const MenuStyle = styled.div<{ isMenuOpen: boolean }>`
  background-color: rgba(245, 245, 245, 0.23);
  width: 100px;
  height: 100px;
  position: absolute;
  visibility: ${props => props.isMenuOpen ? 'visible' : 'hidden'};
`

export const Menu: FC<MenuProps> = ({ isMenuOpen, setIsMenuOpen }) => {

  return (
    <MenuStyle isMenuOpen={isMenuOpen}>
    </MenuStyle>
  )
}
