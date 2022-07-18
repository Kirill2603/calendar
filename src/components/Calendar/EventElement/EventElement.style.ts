import styled from 'styled-components'

export const EventElementStyle = styled.ul`
  width: 90%;
  margin: 1px auto;
  list-style: none;
  cursor: pointer;
`

export const EventItem = styled.li<{eventColor: 'red' | 'green' | 'blue' | 'purple' | 'orange' | 'yellow'}>`
  margin: 1px auto;
  color: white;
  background-color: ${props => props.eventColor};
  padding: 0.05rem 0.5rem 0.05rem 0.5rem;
  border-radius: 3px;
  cursor: pointer;
`