import React from 'react'
import dayjs from 'dayjs'

const App = () => {

  const starOfMonth = dayjs(dayjs().startOf('month')).startOf('week')
  let dayIterator = 1
  const monthArray = [...Array(42)].map(() => starOfMonth.add(dayIterator++, 'day'))

  return (
    <div>
      {monthArray.map((day) => <div>{day.format('DD MMMM')}</div>)}
    </div>
  )
}

export default App