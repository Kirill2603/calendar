import React, { useEffect } from 'react'
import { MonthView } from './components/MonthView/MonthView'
import { MiniCalendar } from './components/miniCalendar'
import { YearView } from './components/YearView/YearView'
import { Header } from './components/Header'
import { useAppSelector } from './store/store'
import { useLazyGetWeatherFor5DaysQuery } from './store/weatherSlice'
import { usePosition } from './Helpers/usePosition'

const App = () => {

  const {
    calendarActiveDate,
    miniCalendarActiveDate,
    activeView,
    isAdditionalPanelShow,
    today,
  } = useAppSelector(state => state.calendar)

  const { position } = usePosition()
  const [trigger, {data}] = useLazyGetWeatherFor5DaysQuery()

  useEffect(() => {

    if (position) {
      trigger({ lon: position.longitude, lat: position.latitude })
    }
  }, [trigger, position])

  return (
    <div className='flex flex-col h-full w-full'>
      <Header activeView={activeView} isAdditionalPanelShow={isAdditionalPanelShow} />
      <div className='flex flex-row h-full w-full'>
        {isAdditionalPanelShow && <MiniCalendar miniCalendarActiveDate={miniCalendarActiveDate} />}
        {activeView === 'year' && <YearView calendarActiveDate={calendarActiveDate} />}
        {activeView === 'month' &&
          <MonthView today={today} calendarActiveDate={calendarActiveDate} weather={data}/>}
      </div>
    </div>
  )
}

export default App
