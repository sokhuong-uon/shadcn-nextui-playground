'use client'

import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

import { useFormContext } from 'react-hook-form'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { NextStepButtonLink } from '../components/next-button'
import {
  SignUpFormSchema,
  requiredPersonalInformationFields,
} from '../sign-up-schema'

export default function PersonalInformationPage() {
  const router = useRouter()
  const form = useFormContext<SignUpFormSchema>()

  const handleSubmit = async (formEvent: FormEvent) => {
    formEvent.preventDefault()
    const isPersonalInformationValid = await form.trigger(
      requiredPersonalInformationFields,
      {
        shouldFocus: true,
      }
    )

    if (!isPersonalInformationValid) return
    router.push('/sign-up/account')
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <legend>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
        </legend>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="givenName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Given Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <NextStepButtonLink
            onClick={handleSubmit}
            href="/sign-up/account"
            isDisabled={false}
          >
            Next
          </NextStepButtonLink>
        </CardFooter>
      </form>
    </Card>
  )
}
