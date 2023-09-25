import React, { useState } from 'react'
import { formConfig, FormData } from '../../../Types/config'
import './Form.css'

interface FormProps {
  onSubmit: (formData: FormData) => void
}

/**
 * The Form component is a dynamic form generator that takes a configuration
 * object to create various form fields. It performs client-side validation
 * based on the rules specified in the configuration.
 *
 * Props:
 * - `onSubmit`: A callback function that is invoked when the form is submitted.
 * The function receives the form data as its argument.
 */
const Form: React.FC<FormProps> = ({ onSubmit }) => {

  const [formData, setFormData] = useState<FormData>({})
  const [formErrors, setFormErrors] = useState<FormData>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateField = (name: string, value: string, validation: any) => {
    let error = ''
    
    if (validation.required && !value) {
      error = 'This field is required'
    } else if (validation.minLength && value.length < validation.minLength) {
      error = `Minimum length is ${validation.minLength}`
    } else if (validation.pattern && !validation.pattern.test(value)) {
      error = 'Invalid format or wrong data'
    }

    setFormErrors({
      ...formErrors,
      [name]: error,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let isValid = true

    formConfig.forEach(({ name, validation }) => {
      const value = formData[name] || ''
      validateField(name, value, validation)
      if (formErrors[name]) {
        isValid = false
      }
    })

    if (isValid) {
      onSubmit(formData)
    }
  }

  return (
    <div className="layer">
      <form onSubmit={handleSubmit} className="form">
        {formConfig.map(({ name, type, validation }, index) => (
          <div key={index}>
            <label>{name}</label>
            <input
              type={type}
              name={name}
              onChange={handleChange}
              value={formData[name] || ''}
              className={`form ${formErrors[name] ? 'error' : ''}`}
              onBlur={() =>
                validateField(name, formData[name] || '', validation)
              }
            />
            {formErrors[name] && (
              <span className="errorMessage">{formErrors[name]}</span>
            )}
          </div>
        ))}
        <button type="submit">Login to see table data</button>
      </form>
    </div>
  )
}

export default Form
