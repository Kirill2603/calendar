import React, { FC, useState } from 'react'
import {
  Button, Center, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import moment, { Moment } from 'moment'
import { Event } from 'store/eventsSlice'
import { AddEventPopoverBody } from './AddEventPopoverBody'
import { WithEventPopoverBody } from './WithEventPopoverBody'

type DatePopoverProps = {
  day: Moment
  events: Event[] | undefined
  isOpen: boolean
  onClose: () => void
  refetch: () => void
}

export const EventPopover: FC<DatePopoverProps> = ({ day, events, onClose, isOpen, refetch }) => {

  const [createMode, setCreateMod] = useState(false)

  return (
    <Popover placement='right'
             returnFocusOnClose={false}
             isOpen={isOpen}
             onClose={onClose}
    >
      <PopoverTrigger>
        <Button
          opacity='0.1'
          variant='ghost'
          position='absolute'></Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>
          <Center fontWeight='bold' fontSize='large'>
            {day.format('DD MMMM YYYY')}
          </Center>
        </PopoverHeader>
        <PopoverCloseButton />

        {((events && events.length === 0) || createMode)  && < AddEventPopoverBody eventDate={Number(moment(day).format('x'))} onClose={onClose} refetch={refetch}/> }
        {(events && events.length > 0 && !createMode) && <WithEventPopoverBody events={events} setCreateMod={setCreateMod} />}

      </PopoverContent>
    </Popover>
  )
}
