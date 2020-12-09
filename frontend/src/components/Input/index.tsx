import React, {
  forwardRef,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from 'react'

import './styles.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  span?: string
  shouldHide?: boolean
  placeholder: string
}

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string
  span?: string
  placeholder: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  span?: string
  options: {
    label: string
    value: string
  }[]
  shouldHide?: boolean
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

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, span, options, placeholder, shouldHide, ...props }, ref) => {
    return (
      <div className={`input-container ${shouldHide ? 'hidden' : ''}`}>
        <label>
          {label}
          {span && <span>{span}</span>}
        </label>
        <select ref={ref} {...props}>
          <option value="0" selected disabled hidden>
            {placeholder}
          </option>

          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
)

export default Input
export { TextArea, Select }
