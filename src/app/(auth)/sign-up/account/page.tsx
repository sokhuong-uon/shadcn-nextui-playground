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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useZodForm } from '@/hooks/use-zod-sign-up-form'

import { useSignUpFormContext } from '../sign-up-form-context'
import { accountDetailsSchema } from '../sign-up-schema'

export default function AccountDetails() {
  const router = useRouter()
  const { formData, updateFormData } = useSignUpFormContext()
  const { errors, validate } = useZodForm(accountDetailsSchema)

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    if (
      validate({
        username: formData.username,
        password: formData.password,
      })
    ) {
      router.push('/sign-up/preferences')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username || ''}
              onChange={(e) => updateFormData({ username: e.target.value })}
              className={errors.username ? 'border-red-500' : ''}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password || ''}
              onChange={(e) => updateFormData({ password: e.target.value })}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          Previous
        </Button>
        <Button onClick={handleSubmit}>Next</Button>
      </CardFooter>
    </Card>
  )
}
