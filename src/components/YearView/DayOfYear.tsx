import dayjs, { Dayjs } from 'dayjs'
import { Event } from '../../store/types'
import React, { FC, useState } from 'react'
import { EventDots } from './EventDots/EventDots'
import { Modal } from '../Modal/Modal'
import { CreateEventModalBody } from '../Modal/CreateEventModalBody'
import { EventsList } from '../MonthView/EventsList'
import { Button } from '../UI'

type DayOfYearProps = {
  month: Dayjs
  monthDay: Dayjs
  dayEvents: Event[] | undefined
  refetch: () => void
}

export const DayOfYear: FC<DayOfYearProps> = ({ monthDay, month, dayEvents, refetch }) => {

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false)

  const onCloseModal = () => {
    setIsOpenModal(false)
    setIsCreateMode(false)
  }

  return (
    <li
      onClick={() => setIsOpenModal(true)}
      key={monthDay.unix() + 'y'}
      className={`text-neutral-300 leading-tight font-bold py-1 px-1 inline-flex flex-col w-fit m-auto items-center cursor-pointer
            ${monthDay.isSame(dayjs(), 'day') && 'bg-red-500 rounded-full text-neutral-900'}
            ${!monthDay.isSame(dayjs(month), 'month') && 'text-neutral-700'}
            `}>
      <span>{monthDay.format('D')}</span>
      {dayEvents && <EventDots events={dayEvents} />}
      {isOpenModal &&
        <Modal title={monthDay.format('DD MMMM YYYY')} onClose={onCloseModal}>
          <>
            {isCreateMode
              ?
              <CreateEventModalBody day={monthDay} onClose={onCloseModal} refetch={refetch}/>
              :
              dayEvents?.length === 0 ?
                <>
                  <CreateEventModalBody day={monthDay} onClose={onCloseModal} refetch={refetch} />
                </>
                :
                <div className='flex flex-col justify-start align-middle items-end p-2'>
                  <EventsList events={dayEvents} type='default' refetch={refetch} />
                  <Button colorScheme='green' onClick={() => setIsCreateMode(true)}>Create</Button>
                </div>
            }
          </>
        </Modal>
      }
    </li>
  )
}