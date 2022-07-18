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

  .weekDays {
    background-color: #1f2022;
    display: flex;
    justify-content: end;
    align-items: end;
    padding: 0.6rem;
    font-size: 1.2rem;
    box-shadow: 5px 0 0 0 #1f2022;
  }
`

export const CellItem = styled.div<{ isWeekend: boolean, isThisMonth: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${props => props.isWeekend ? '#28282a' : '#1f2022'};
  color: ${props => props.isThisMonth ? '' : '#606062'};
  >div,ul{
    opacity: ${props => props.isThisMonth ? '' : 0.4}; !important;
  }
  &:hover {
    background-color: #57585a;
  }
`

export const Date = styled.div<{ today: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: end;
  font-size: 1.2rem;
  padding: 0.2rem;

  > p {
    font-weight: 600;
    background-color: ${props => props.today ? '#f04135' : ''};;
    border-radius: 50%;
    padding: 0.4rem;
    color: ${props => props.today ? 'black' : ''};
    cursor: pointer;
  }
`

export const EventList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

export const EventElement = styled.li<{ eventColor: 'red' | 'green' | 'blue' | 'purple' | 'orange' | 'yellow' }>`
  width: 90%;
  margin: 1px auto;
  color: white;
  background-color: ${props => props.eventColor};
  list-style: none;
  padding: 0.1rem 0.5rem 0.1rem 0.5rem;
  border-radius: 3px;
  cursor: pointer;
`