import { Dayjs } from 'dayjs'
import React, { FC, useState } from 'react'
import { Event } from 'store/types'
import { Button } from 'components/UI'
import { CreateEventModalBody } from '../Modal/CreateEventModalBody'
import { Modal } from '../Modal/Modal'
import { EventsList } from './EventsList'

type DayCellProps = {
  events: Event[] | undefined
  day: Dayjs
  today: Dayjs
  refetch: () => void
  calendarActiveDate: Dayjs
  weatherForDay: Array<{dt: number, main: {temp: number}, weather: Array<{ main: string }> }> | undefined
}

export const DayCell: FC<DayCellProps> = ({ day, today, calendarActiveDate, events, refetch, weatherForDay }) => {

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false)

  const onCloseModal = () => {
    setIsOpenModal(false)
    setIsCreateMode(false)
  }

  return (
    <li
      className={`bg-neutral-800 flex flex-col justify-start font-semibold w-full text-lg pl-2
            ${!day.isSame(calendarActiveDate, 'month') ? 'text-neutral-500' : ''}
            ${(day.day() === 6 || day.day() === 0) ? 'bg-opacity-80' : ''}`}
    >
      <div className='w-full flex flex-row justify-between items-center'>
        {weatherForDay && (weatherForDay?.length > 0) && <span>
          {weatherForDay[0].weather[0].main === 'Clouds' && '☁'}
          {weatherForDay[0].weather[0].main === 'Clear' && '☀'}
          {weatherForDay[0].weather[0].main === 'Rain' && '☂'}
          {weatherForDay[0].main.temp.toFixed()} ℃</span>}
        <button
          onClick={() => setIsOpenModal(true)}
          className={`cursor-pointer p-1.5 m-1 leading-none ${day.isSame(today, 'day') ? 'bg-red-500 rounded-full text-neutral-800' : ''}`}>
          {day.format('DD')}
        </button>
        {isOpenModal &&
          <Modal title={day.format('DD MMMM YYYY')} onClose={onCloseModal}>
            <>
              {isCreateMode
                ?
                <CreateEventModalBody day={day} onClose={onCloseModal} refetch={refetch}/>
                :
                events?.length === 0 ?
                  <>
                    <CreateEventModalBody day={day} onClose={onCloseModal} refetch={refetch}/>
                  </>
                  :
                  <div className='flex flex-col justify-start align-middle items-end p-2'>
                    <EventsList events={events} type='default' refetch={refetch}/>
                    <Button colorScheme='green' onClick={() => setIsCreateMode(true)}>Create</Button>
                  </div>
              }
            </>
          </Modal>
        }
      </div>
      <EventsList events={events} type='mini' refetch={refetch} />
    </li>
  )
}
