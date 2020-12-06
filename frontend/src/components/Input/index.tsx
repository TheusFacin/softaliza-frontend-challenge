import React, { forwardRef, InputHTMLAttributes } from 'react'
import InputMask from 'react-input-mask'

import './styles.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  span?: string
  placeholder: string
  mask: string | (string | RegExp)[]
}

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string
  span?: string
  placeholder: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, span, placeholder, mask, ...props }, ref) => {
    return (
      <div className="input-container">
        <label>
          {label}
          {span && <span>{span}</span>}
        </label>
        <InputMask mask={mask}>
          {() => <input placeholder={placeholder} ref={ref} {...props} />}
        </InputMask>
      </div>
    )
  }
)

const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, span, placeholder, ...props }, ref) => {
    return (
      <div className="input-container">
        <label>
          {label}
          {span && <span>{span}</span>}
        </label>
        <textarea placeholder={placeholder} ref={ref} {...props}></textarea>
      </div>
    )
  }
)

export default Input
export { TextArea }
