export interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string

  // Account Details
  username: string
  password: string

  // Preferences
  role: string
  experience: string
}

export interface FormErrors {
  [key: string]: string
}

export interface FormProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}
