import { ReactNode, createContext, useContext, useState } from 'react'

import { SignUpFormSchemaShape } from './sign-up-schema'

interface SignUpFormContextType {
  formData: Partial<SignUpFormSchemaShape>
  updateFormData: (data: Partial<SignUpFormSchemaShape>) => void
  isSubmitting: boolean
  setIsSubmitting: (value: boolean) => void
}

const SignUpFormContext = createContext<SignUpFormContextType | undefined>(
  undefined
)

export function SignUpFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<Partial<SignUpFormSchemaShape>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFormData = (newData: Partial<SignUpFormSchemaShape>): void => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }))
  }

  return (
    <SignUpFormContext.Provider
      value={{
        formData,
        updateFormData,
        isSubmitting,
        setIsSubmitting,
      }}
    >
      {children}
    </SignUpFormContext.Provider>
  )
}

export function useSignUpFormContext() {
  const context = useContext(SignUpFormContext)
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}
