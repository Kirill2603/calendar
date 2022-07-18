import styled from 'styled-components'

export const ModalStyle = styled.div<{active: boolean}>`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  pointer-events: ${props => props.active ? 'all' : 'none'};
  opacity: ${props => props.active ? '1' : '0'};
`

export const ModalContent = styled.div`
  height: 400px;
  width: 400px;
  background-color: #28282a;
  border-radius: 5px;
`
