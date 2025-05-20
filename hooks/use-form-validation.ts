"use client"

import { useState, useEffect } from "react"

interface ValidationRules {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  email?: boolean
  match?: string
  customValidator?: (value: string) => string | null
}

interface FieldState {
  value: string
  error: string | null
  touched: boolean
  valid: boolean
}

export function useFormValidation(
  initialValues: Record<string, string>,
  validationRules: Record<string, ValidationRules>,
  validateOnChange = true,
) {
  const createInitialFieldsState = () => {
    const fieldsState: Record<string, FieldState> = {}
    Object.keys(initialValues).forEach((key) => {
      fieldsState[key] = {
        value: initialValues[key],
        error: null,
        touched: false,
        valid: !validationRules[key]?.required || !!initialValues[key],
      }
    })
    return fieldsState
  }

  const [fields, setFields] = useState(createInitialFieldsState())
  const [isFormValid, setIsFormValid] = useState(false)

  const validateField = (name: string, value: string, formValues: Record<string, string> = {}): string | null => {
    const rules = validationRules[name]
    if (!rules) return null

    if (rules.required && !value) {
      return "Ce champ est requis"
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Minimum ${rules.minLength} caractères requis`
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Maximum ${rules.maxLength} caractères autorisés`
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return "Format invalide"
    }

    if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Email invalide"
    }

    if (rules.match && value !== formValues[rules.match]) {
      return "Les valeurs ne correspondent pas"
    }

    if (rules.customValidator) {
      return rules.customValidator(value)
    }

    return null
  }

  const handleChange = (name: string, value: string) => {
    const formValues = Object.keys(fields).reduce(
      (values, key) => {
        values[key] = key === name ? value : fields[key].value
        return values
      },
      {} as Record<string, string>,
    )

    const error = validateOnChange ? validateField(name, value, formValues) : null

    setFields((prev) => ({
      ...prev,
      [name]: {
        value,
        error,
        touched: true,
        valid: !error,
      },
    }))
  }

  const handleBlur = (name: string) => {
    if (!fields[name].touched) {
      const formValues = Object.keys(fields).reduce(
        (values, key) => {
          values[key] = fields[key].value
          return values
        },
        {} as Record<string, string>,
      )

      const error = validateField(name, fields[name].value, formValues)

      setFields((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          error,
          touched: true,
          valid: !error,
        },
      }))
    }
  }

  const validateForm = (): boolean => {
    const formValues = Object.keys(fields).reduce(
      (values, key) => {
        values[key] = fields[key].value
        return values
      },
      {} as Record<string, string>,
    )

    let isValid = true
    const newFields = { ...fields }

    Object.keys(validationRules).forEach((fieldName) => {
      const error = validateField(fieldName, fields[fieldName]?.value || "", formValues)
      newFields[fieldName] = {
        ...newFields[fieldName],
        error,
        touched: true,
        valid: !error,
      }
      if (error) isValid = false
    })

    setFields(newFields)
    return isValid
  }

  const resetForm = () => {
    setFields(createInitialFieldsState())
  }

  const getValues = (): Record<string, string> => {
    return Object.keys(fields).reduce(
      (values, key) => {
        values[key] = fields[key].value
        return values
      },
      {} as Record<string, string>,
    )
  }

  useEffect(() => {
    const formValid = Object.keys(fields).every((key) => {
      return !validationRules[key]?.required || fields[key].valid
    })
    setIsFormValid(formValid)
  }, [fields, validationRules])

  return {
    fields,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    isFormValid,
    getValues,
  }
}
