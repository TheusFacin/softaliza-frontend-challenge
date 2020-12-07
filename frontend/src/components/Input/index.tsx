import React, { forwardRef, InputHTMLAttributes } from 'react'

import './styles.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  span?: string
  shouldHide?: boolean
  placeholder: string
}

interface TextareProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string
  span?: string
  placeholder: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, span, shouldHide, placeholder, ...props }, ref) => {
    return (
      <div className={`input-container ${shouldHide ? 'hidden' : ''}`}>
        <label>
          {label}
          {span && <span>{span}</span>}
        </label>
        <input placeholder={placeholder} ref={ref} {...props} />
      </div>
    )
  }
)

const TextArea = forwardRef<HTMLTextAreaElement, TextareProps>(
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
