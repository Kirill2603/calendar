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
import { newEvent } from '../store/eventsSlice'
import { Moment } from 'moment'

type ColorsPopoverProps = {
  color: 'red' | 'green' | 'blue' | 'purple' | 'orange' | 'yellow' | undefined
  addEventState: newEvent
  setAddEventState: (addEventState: newEvent) => void
}

export const ColorsPopover: FC<ColorsPopoverProps> = ({ color, addEventState, setAddEventState }) => {

  const colors: Array<'red' | 'green' | 'blue' | 'purple' | 'orange' | 'yellow'> = ['red', 'green', 'blue', 'purple', 'orange', 'yellow']

  return (
    <Popover
      placement='bottom-start'>
      <PopoverTrigger>
        <IconButton
          aria-label='color'
          backgroundColor={color ? color : ''}
          icon={<MdOutlineColorLens />} />
      </PopoverTrigger>
      <PopoverContent w='fit-content'>
        <PopoverHeader fontWeight='bold'>Color</PopoverHeader>
        <PopoverArrow />
        <Grid templateColumns='repeat(3, 1fr)'>
          {colors.map(color =>
            <IconButton
              key={color}
              as={'li'}
              m={2}
              aria-label={color}
              onClick={() => setAddEventState({ ...addEventState, color: color })}
              icon={<FaCircle fill={color} />} />,
          )}
        </Grid>
      </PopoverContent>
    </Popover>
  )
}
