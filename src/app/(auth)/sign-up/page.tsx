'use client'

import { useRouter } from 'next/navigation'

import { useFormContext } from 'react-hook-form'

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

import { PersonalInformationFields, SignUpFormSchema } from './sign-up-schema'

export default function PersonalInformationPage() {
  const router = useRouter()
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<SignUpFormSchema>()

  const handleSubmit = async () => {
    const requiredFields: PersonalInformationFields[] = [
      'firstName',
      'lastName',
      'email',
    ]
    const isPersonalInformationValid = await trigger(requiredFields, {
      shouldFocus: true,
    })
    if (!isPersonalInformationValid) return
    router.push('/sign-up/account')
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
            <Input id="firstName" {...register('firstName')} />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName?.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" {...register('lastName')} />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName?.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register('email')} />
            {errors.email && (
              <p className="text-red-500">{errors.email?.message}</p>
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
