import React, { InputHTMLAttributes } from 'react'
import InputMask from 'react-input-mask'

import './styles.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  span?: string
  placeholder: string
  mask: string
}

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string
  span?: string
  placeholder: string
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

const TextArea: React.FC<TextareaProps> = ({
  label,
  span,
  placeholder,
  ...props
}) => {
  return (
    <div className="input-container">
      <label>
        {label}
        {span && <span>{span}</span>}
      </label>
      <textarea placeholder={placeholder} {...props}></textarea>
    </div>
  )
}

export default Input
export { TextArea }
