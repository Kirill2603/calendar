import React, { FC } from 'react'

type ColorPikerProps = {
  activeColor: 'red' | 'green' | 'blue' | 'purple' | 'orange' | 'yellow'
  onChangeColor: (color: 'red' | 'green' | 'blue' | 'purple' | 'orange' | 'yellow') => void
}

const ColorPiker: FC<ColorPikerProps> = ({ activeColor, onChangeColor }) => {

  const colors: Array<'red' | 'green' | 'blue' | 'purple' | 'orange' | 'yellow'> = ['red', 'green', 'blue', 'purple','orange', 'yellow']

  return (
    <ul className='flex flex-row justify-between'>
      {colors.map(color =>
        <li
          key={color}
          onClick={() => onChangeColor(color)}
          className={`w-10 h-10 bg-${color}-400 
          rounded-full ${color===activeColor ? 'ring-2 ring-white ring-offset-1' : ''}
          hover:ring-2 ring-white active:opacity-80`}/>)}
    </ul>
  )
}

export default ColorPiker