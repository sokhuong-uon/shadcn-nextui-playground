'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useSignUpStep } from '../components/sign-up-step-context'
import { SignUpFormSchema } from '../sign-up-schema'

export default function Preferences() {
  const router = useRouter()
  const { getValues, control, formState, trigger } =
    useFormContext<SignUpFormSchema>()
  const signUpStep = useSignUpStep()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    signUpStep.previousStep.current = 3

    if (!formState.isValid) return trigger()

    console.log('form fields are valid', getValues())
    router.push('/success')
  }

  const roles: { value: SignUpFormSchema['role']; label: string }[] = [
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'manager', label: 'Manager' },
  ]

  const experiences: {
    value: SignUpFormSchema['experience']
    label: string
  }[] = [
    { value: 'junior', label: 'Junior (0-2 years)' },
    { value: 'mid', label: 'Mid-Level (2-5 years)' },
    { value: 'senior', label: 'Senior (5+ years)' },
  ]

  return (
    <form onSubmit={handleSubmit}>
      <legend>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
      </legend>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Role</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {roles.map((role) => (
                    <FormItem
                      key={role.value}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={role.value} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {role.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {experiences.map((experience) => (
                    <SelectItem key={experience.value} value={experience.value}>
                      {experience.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link
            onClick={() => (signUpStep.previousStep.current = 3)}
            href="/sign-up/account"
          >
            Previous
          </Link>
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </CardFooter>
    </form>
  )
}
