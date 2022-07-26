import React, { FC } from 'react'
import {
  Grid,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import { MdOutlineColorLens } from 'react-icons/md'
import { FaCircle } from 'react-icons/fa'
import { Event } from 'store/eventsSlice'

type ColorsPopoverProps = {
  color: 'red' | 'green' | 'blue' | 'purple' | 'orange' | 'yellow' | undefined
  currentEventState: Event
  setCurrentEventState: (currentEventState: Event) => void
}

export const ColorsPopover: FC<ColorsPopoverProps> = ({
  color,
  currentEventState,
  setCurrentEventState,
}) => {
  const colors: Array<'red' | 'green' | 'blue' | 'purple' | 'orange' | 'yellow'> = [
    'red',
    'green',
    'blue',
    'purple',
    'orange',
    'yellow',
  ]

  return (
    <Popover placement='bottom-start'>
      <PopoverTrigger>
        <IconButton
          aria-label='color'
          backgroundColor={color ? color : ''}
          icon={<MdOutlineColorLens />}
        />
      </PopoverTrigger>
      <PopoverContent w='fit-content'>
        <PopoverHeader fontWeight='bold'>Color</PopoverHeader>
        <PopoverArrow />
        <Grid templateColumns='repeat(3, 1fr)'>
          {colors.map(color => (
            <IconButton
              key={color}
              as={'li'}
              m={2}
              aria-label={color}
              onClick={() => setCurrentEventState({ ...currentEventState, color: color })}
              icon={<FaCircle fill={color} />}
            />
          ))}
        </Grid>
      </PopoverContent>
    </Popover>
  )
}
