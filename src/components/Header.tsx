import React from 'react'
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

export const Header = () => {

  const { colorMode, toggleColorMode } = useColorMode()
  
  return (
    <header>
      <Flex justify='space-between' p={2}>
        <IconButton aria-label="add" icon={<AddIcon/>}/>
        <ButtonGroup size='md' isAttached variant='outline'>
          <Button>Day</Button>
          <Button>Week</Button>
          <Button>Month</Button>
          <Button>Year</Button>
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
