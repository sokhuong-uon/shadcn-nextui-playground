import { useState } from 'react'

import { ZodError, z } from 'zod'

export function useZodForm<T extends z.ZodType>(schema: T) {
  type ValidationErrors = {
    [K in keyof z.infer<T>]?: string
  }

  const [errors, setErrors] = useState<ValidationErrors>({})

  const validate = (data: unknown): data is z.infer<T> => {
    try {
      schema.parse(data)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: ValidationErrors = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof z.infer<T>] = err.message
          }
        })
        setErrors(formattedErrors)
      }
      return false
    }
  }

  return { errors, validate, setErrors }
}
