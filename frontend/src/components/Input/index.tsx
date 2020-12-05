import React, { HTMLAttributes } from 'react'
import InputMask from 'react-input-mask'

import './styles.scss'

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  label: string
  span?: string
  placeholder: string
  mask: string
}

const Input: React.FC<InputProps> = ({
  label,
  span,
  placeholder,
  mask,
  ...props
}) => {
  return (
    <div className="input-container">
      <label>
        {label}
        {span && <span>{span}</span>}
      </label>
      <InputMask mask={mask} placeholder={placeholder} {...props} />
    </div>
  )
}

export default Input
