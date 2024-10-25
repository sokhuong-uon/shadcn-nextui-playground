import { ReactNode, createContext, useContext, useState } from 'react'

import { SignUpFormSchemaShape } from './sign-up-schema'

interface FormContextType {
  formData: Partial<SignUpFormSchemaShape>
  updateFormData: (data: Partial<SignUpFormSchemaShape>) => void
  isSubmitting: boolean
  setIsSubmitting: (value: boolean) => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<Partial<SignUpFormSchemaShape>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFormData = (newData: Partial<SignUpFormSchemaShape>): void => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }))
  }

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        isSubmitting,
        setIsSubmitting,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}
