import React, { FC } from 'react'
import { Colors } from 'store/types'

type ColorPikerProps = {
  activeColor: Colors | undefined
  onChangeColor: (color: Colors) => void
}

export const ColorPiker: FC<ColorPikerProps> = ({ activeColor, onChangeColor }) => {

  const colors: Colors[] = [Colors.RED, Colors.GREEN, Colors.BLUE, Colors.PURPLE, Colors.ORANGE, Colors.YELLOW]

  return (
    <ul className='flex flex-row justify-between'>
      {colors.map(color =>
        <li
          key={color}
          onClick={() => onChangeColor(color)}
          className={`w-10 h-10 bg-${color}-500 mx-1 my-1
          rounded-full ${color === activeColor ? 'ring-2 ring-white ring-offset-1' : ''}
          hover:ring-2 ring-white active:opacity-80`} />)}
    </ul>
  )
}
