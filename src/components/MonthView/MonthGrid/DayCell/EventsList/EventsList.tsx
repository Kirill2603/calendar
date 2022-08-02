import React, { FC, useLayoutEffect, useRef, useState } from 'react'
import { Event } from 'store/eventsSlice'

type EventListProps = {
  events: Event[] | undefined
}

const EventsList: FC<EventListProps> = ({ events }) => {


  return (
    <ul className=''>
      {events?.map(event =>
        <li
          key={event._id}
          className={`bg-${event.color}-700 text-${event.color}-200 px-2 mb-1 ml-2 rounded-l text-sm font-bold`}>
          <>
            <EventBudge event={event} />
          </>
        </li>,
      )}
    </ul>
  )
}

export default EventsList

type EventBudgeProps = {
  event: Event
}

const EventBudge: FC<EventBudgeProps> = ({ event }) => {

  const [isOpen, setIsOpen] = useState(false)

  const trigger = useRef<HTMLSpanElement>(null)

  const [parent, setParent] = useState({ width:0, height: 0, x: 0, y: 0});

  useLayoutEffect(() => {
    if (trigger.current) {
      setParent({
        width: trigger.current.offsetWidth,
        height: trigger.current.offsetHeight,
        x: trigger.current.offsetLeft,
        y: trigger.current.offsetTop
      });
    }
  }, []);


  return (
    <>
      <span ref={trigger} className='block relative'
            onClick={() => setIsOpen(true)}>{event.title.toUpperCase()}</span>
      {isOpen && <EventPopover isOpen={isOpen} setIsOpen={setIsOpen} parent={parent} />}
    </>
  )
}

type EventPopoverProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  parent: {x: number, y: number, width: number, height: number}
}

const EventPopover: FC<EventPopoverProps> = ({ isOpen, setIsOpen, parent }) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width:0, height: 0 });

  useLayoutEffect(() => {
    if (popoverRef.current) {
      setDimensions({
        width: popoverRef.current.offsetWidth,
        height: popoverRef.current.offsetHeight
      });
    }
  }, []);

  const isBeyondTheRight = document.body.clientWidth < (parent.x + parent.width + dimensions.width)
  const isBeyondTheBottom = document.body.clientHeight < (parent.y + parent.height + dimensions.height)

  const style = {
    transform: isBeyondTheRight ? `translateX(-100%)` : '',
    left: isBeyondTheRight ? `${parent.x}px` : `${parent.x + parent.width}px`,
    top: isBeyondTheBottom ? `${parent.y + parent.height - dimensions.height}px` : `${parent.y}px`,
  }

  console.log(isBeyondTheBottom)

  return (
    <>
      <div
        ref={popoverRef}
        style={style}
        className='absolute bg-neutral-800 border border-neutral-500 rounded h-40 w-80 z-10  px-2'>
        <button onClick={() => setIsOpen(false)}>X</button>
      </div>
    </>
  )
}