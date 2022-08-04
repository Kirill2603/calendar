import { Event } from 'store/eventsSlice'
import { Dayjs } from 'dayjs'
import React, { FC, useState } from 'react'
import EventsList from './EventsList'
import Modal from '../../Modal/Modal'
import CreateEventModalBody from '../../Modal/CreateEventModalBody'
import Button from '../../UI/Button'

type DayCellProps = {
  events: Event[] | undefined
  day: Dayjs
  today: Dayjs
  activeDate: Dayjs
}

const DayCell: FC<DayCellProps> = ({ day, today, activeDate, events }) => {

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false)

  const onCloseModal = () => {
    setIsOpenModal(false)
    setIsCreateMode(false)
  }

  return (
    <li
      className={`bg-neutral-800 flex flex-col justify-start font-semibold w-full text-lg
            ${!day.isSame(activeDate, 'month') ? 'text-neutral-500' : ''}
            ${(day.day() === 6 || day.day() === 0) ? 'bg-opacity-80' : ''}`}
    >
      <div className='w-full flex flex-row justify-end'>
        <button
          onClick={() => setIsOpenModal(true)}
          className={`cursor-pointer p-2 m-1 leading-none ${day.isSame(today, 'day') ? 'bg-red-500 rounded-full text-neutral-800' : ''}`}>
          {day.format('DD')}
          {isOpenModal &&
            <Modal title={day.format('DD MMMM YYYY')} onClose={onCloseModal}>
              <>
                {isCreateMode
                  ?
                  <CreateEventModalBody day={day} onClose={onCloseModal} />
                  :
                  events?.length === 0 ?
                    <>
                      <CreateEventModalBody day={day} onClose={onCloseModal} />
                    </>
                    :
                    <div className='flex flex-col justify-start align-middle items-end p-2'>
                      <EventsList events={events} type='normal' />
                      <Button colorScheme='green' onClick={() => setIsCreateMode(true)}>Create</Button>
                    </div>
                }
              </>
            </Modal>
          }
        </button>
      </div>
      <EventsList events={events} type='mini' />
    </li>
  )
}

export default DayCell