import styled from 'styled-components'

export const CalendarGrid = styled.div`
  flex: 0 1 auto;
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 30px repeat(6, 1fr);
  background-color: rgba(38, 38, 38, 0.78);
  color: aliceblue;
  grid-gap: 1px;
`

export const DayCell = styled.div`
  background-color: #1f2022;
  display: flex;
  justify-content: end;
  align-items: end;
  padding: 0.6rem;
  font-size: 1.2rem;
  box-shadow: 5px 0 0 0 #1f2022;
`

export const Date = styled.div<{ today: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: end;
  font-size: 1.2rem;
  padding: 0.2rem;

  > button {
    font-weight: 600;
    font-size: 1rem;
    background: ${props => props.today ? '#f04135' : 'none'};;
    border: 0;
    border-radius: 50%;
    padding: 0.4rem;
    color: ${props => props.today ? 'black' : 'white'};
    cursor: pointer;
  }
`
