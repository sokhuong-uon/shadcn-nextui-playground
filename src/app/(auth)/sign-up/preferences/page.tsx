'use client'

import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useZodForm } from '@/hooks/use-zod-sign-up-form'

import { useFormContext } from '../sign-up-form-context'
import { FormData, preferencesSchema } from '../sign-up-schema'

type Role = 'developer' | 'designer' | 'manager'
type Experience = 'junior' | 'mid' | 'senior'

export default function Preferences() {
  const router = useRouter()
  const { formData, updateFormData } = useFormContext()
  const { errors, validate } = useZodForm(preferencesSchema)

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    if (
      validate({
        role: formData.role,
        experience: formData.experience,
      })
    ) {
      try {
        const response = await submitRegistration(formData as FormData)
        if (response.success) {
          router.push('/sign-up/success')
        }
      } catch (error) {
        console.error('Registration failed:', error)
      }
    }
  }

  const handleRoleChange = (value: Role) => {
    updateFormData({ role: value })
  }

  const handleExperienceChange = (value: Experience) => {
    updateFormData({ experience: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label>Role</Label>
            <RadioGroup
              value={formData.role}
              onValueChange={handleRoleChange}
              className={errors.role ? 'border-red-500' : ''}
            >
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="developer" id="developer" />
                  <Label htmlFor="developer" className="font-normal">
                    Developer
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="designer" id="designer" />
                  <Label htmlFor="designer" className="font-normal">
                    Designer
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="manager" id="manager" />
                  <Label htmlFor="manager" className="font-normal">
                    Manager
                  </Label>
                </div>
              </div>
            </RadioGroup>
            {errors.role && (
              <p className="mt-1 text-sm text-red-500">{errors.role}</p>
            )}
          </div>

          <div className="space-y-4">
            <Label>Experience Level</Label>
            <Select
              value={formData.experience}
              onValueChange={handleExperienceChange}
            >
              <SelectTrigger
                className={errors.experience ? 'border-red-500' : ''}
              >
                <SelectValue placeholder="Select your experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                <SelectItem value="mid">Mid-Level (2-5 years)</SelectItem>
                <SelectItem value="senior">Senior (5+ years)</SelectItem>
              </SelectContent>
            </Select>
            {errors.experience && (
              <p className="mt-1 text-sm text-red-500">{errors.experience}</p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          Previous
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  )
}

type ApiResponse = {
  success: boolean
  message?: string
}

async function submitRegistration(formData: FormData): Promise<ApiResponse> {
  console.log('Submitting registration:', formData)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 1000)
  })
}
