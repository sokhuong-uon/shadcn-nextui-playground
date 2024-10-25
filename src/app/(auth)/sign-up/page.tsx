'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

import { ZodError } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useFormContext } from './sign-up-form-context'
import { type PersonalInfo, personalInfoSchema } from './sign-up-schema'

type ValidationErrors = {
  [K in keyof PersonalInfo]?: string
}

export default function PersonalInfo() {
  const router = useRouter()
  const { formData, updateFormData } = useFormContext()
  const [errors, setErrors] = useState<ValidationErrors>({})

  const validateFields = (): boolean => {
    try {
      personalInfoSchema.parse({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      })
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: ValidationErrors = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof PersonalInfo] = err.message
          }
        })
        setErrors(formattedErrors)
      }
      return false
    }
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    if (validateFields()) {
      router.push('/sign-up/account')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName || ''}
              onChange={(e) => updateFormData({ firstName: e.target.value })}
              className={errors.firstName ? 'border-red-500' : ''}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName || ''}
              onChange={(e) => updateFormData({ lastName: e.target.value })}
              className={errors.lastName ? 'border-red-500' : ''}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => updateFormData({ email: e.target.value })}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSubmit}>Next</Button>
      </CardFooter>
    </Card>
  )
}
