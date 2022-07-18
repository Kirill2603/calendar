import styled from 'styled-components'

export const MiniCalendarStyles = styled.div`
  
  height: 230px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  color: white;
  align-items: center;
  justify-content: center;
  div{
    margin: 0 auto;
  }
`

export const MiniCalendarNavigate = styled.div`
  border-top: 1px solid #57585a;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 1rem;
  button {
    color: white;
    background: none;
    border: none;
    font-weight: 600;
  }
`

export const MiniCalendarDate = styled.div<{today: boolean, isThisMonth: boolean}>`
  background-color: ${props => props.today ? '#f04135' : ''};
  font-weight: 600;
  color: ${props => props.today ? 'black' : 'white'};;
  border-radius: 50%;
  padding: 0.3rem;
  opacity: ${props => props.isThisMonth ? '' : '0.5'};;
`