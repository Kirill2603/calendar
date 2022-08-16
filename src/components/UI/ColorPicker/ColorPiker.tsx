import React, { FC } from 'react'
import { Colors } from 'store/types'
import styles from './ColorPicker.module.css'

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
          className={`${styles.ColorPicker} ${styles[color]} ${color === activeColor && styles.active}`} />)}
    </ul>
  )
}
