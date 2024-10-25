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

import { AccountDetailsFields, SignUpFormSchema } from '../sign-up-schema'

export default function AccountDetails() {
  const router = useRouter()
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<SignUpFormSchema>()

  const handleSubmit = async () => {
    const requiredFields: AccountDetailsFields[] = ['username', 'password']
    const isAccountDetailsValid = await trigger(requiredFields, {
      shouldFocus: true,
    })
    if (!isAccountDetailsValid) return
    router.push('/sign-up/preferences')
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
            <Input id="username" {...register('username')} />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" {...register('password')} />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
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
