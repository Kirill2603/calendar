import React, { FC } from 'react'
import {
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from '@chakra-ui/react'
import { AddIcon, SearchIcon, SunIcon } from '@chakra-ui/icons'
import { useAppDispatch } from '../store/store'
import { setActiveView } from '../store/calendarSlice'

type HeaderProps = {
  activeView: 'day' | 'week' | 'month' | 'year'
}

export const Header: FC<HeaderProps> = ({activeView}) => {

  const { colorMode, toggleColorMode } = useColorMode()
  const dispatch = useAppDispatch()
  const onSetActiveView = (type: 'day' | 'week' | 'month' | 'year' ) => {
    dispatch(setActiveView({ type }))
  }

  return (
    <header>
      <Flex justify='space-between' p={2}>
        <IconButton aria-label="add" icon={<AddIcon/>}/>
        <ButtonGroup size='md' isAttached variant='outline'>
          <Button colorScheme={activeView === 'day' ? 'blue' : ''} variant={activeView === 'day' ? 'solid' : 'outline'} onClick={() => onSetActiveView('day')}>Day</Button>
          <Button colorScheme={activeView === 'week' ? 'blue' : ''} variant={activeView === 'week' ? 'solid' : 'outline'} onClick={() => onSetActiveView('week')}>Week</Button>
          <Button colorScheme={activeView === 'month' ? 'blue' : ''} variant={activeView === 'month' ? 'solid' : 'outline'} onClick={() => onSetActiveView('month')}>Month</Button>
          <Button colorScheme={activeView === 'year' ? 'blue' : ''} variant={activeView === 'year' ? 'solid' : 'outline'} onClick={() => onSetActiveView('year')}>Year</Button>
        </ButtonGroup>
        <ButtonGroup size='md' isAttached variant='outline'>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<SearchIcon color='gray.300' />}
            />
            <Input type='search' placeholder='Search' />
          </InputGroup>
          <IconButton aria-label={"set mode"} icon={<SunIcon/>} onClick={toggleColorMode}/>
        </ButtonGroup>
      </Flex>
    </header>
  )
}
