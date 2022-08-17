import React, { FC, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Event } from 'store/types'
import { Modal } from '../Modal/Modal'
import { CreateEventModalBody } from '../Modal/CreateEventModalBody'
import { EventsList } from '../MonthView/EventsList'
import { Button } from '../UI'

type MonthCellProps = {
  today: Dayjs
  month: Dayjs
  events: Event[] | undefined
}

export const MontCell: FC<MonthCellProps> = ({ today, month, events }) => {

  const starOfMonthGrid = dayjs(month).startOf('month').startOf('week')
  const monthDays = [...Array(42)].map((day, index) => starOfMonthGrid.add(index++, 'day').clone())
  const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  return (
    <li className='w-fit'>
      <span className='text-red-500 font-bold px-2 text-lg'>{dayjs(month).format('MMMM')}</span>
      <ul className='grid grid-cols-7 text-center gap-1 w-full py-2 font-semibold'>
        {dayNames.map((dayName, index) =>
          <li
            key={dayName + index}
            className='px-2 py-1 text-neutral-600'>
            {dayName}
          </li>)}
      </ul>
      <ul className='grid grid-cols-7 items-center align-middle justify-center'>
        {monthDays.map(monthDay =>
          <DayOfYear
            monthDay={monthDay}
            month={month}
            dayEvents={events?.filter(event => dayjs(event.date).isSame(monthDay, 'day'))} />)}
      </ul>
    </li>
  )
}

type DayOfYearProps = {
  month: Dayjs
  monthDay: Dayjs
  dayEvents: Event[] | undefined
}

const DayOfYear: FC<DayOfYearProps> = ({ monthDay, month, dayEvents }) => {

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
      className={`text-neutral-300 leading-tight font-bold py-1 px-1 inline-flex flex-col w-fit m-auto items-center 
            ${monthDay.isSame(dayjs(), 'day') && 'bg-red-500 rounded-full text-neutral-900'}
            ${!monthDay.isSame(dayjs(month), 'month') && 'text-neutral-700'}
            `}>
      <span>{monthDay.format('D')}</span>
      {dayEvents && <YearEvent day={monthDay} events={dayEvents} />}
      {isOpenModal &&
        <Modal title={monthDay.format('DD MMMM YYYY')} onClose={onCloseModal}>
          <>
            {isCreateMode
              ?
              <CreateEventModalBody day={monthDay} onClose={onCloseModal} />
              :
              dayEvents?.length === 0 ?
                <>
                  <CreateEventModalBody day={monthDay} onClose={onCloseModal} />
                </>
                :
                <div className='flex flex-col justify-start align-middle items-end p-2'>
                  <EventsList events={dayEvents} type='default' />
                  <Button colorScheme='green' onClick={() => setIsCreateMode(true)}>Create</Button>
                </div>
            }
          </>
        </Modal>
      }
    </li>
  )
}

type YearEventProps = {
  day: Dayjs
  events: Event[] | undefined
}
export const YearEvent: FC<YearEventProps> = ({ events, day }) => {


  return (
    <div className='fixed translate-y-2' onClick={() => console.log(day.format('DD MMMM '))}>
      {events?.map(event =>
        <span
          className='leading-none text-neutral-200 text-xl'
          key={event._id}>·</span>,
      )}
    </div>
  )
}