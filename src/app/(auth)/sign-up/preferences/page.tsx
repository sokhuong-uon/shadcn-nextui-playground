'use client'

import { useRouter } from 'next/navigation'
import { useLayoutEffect } from 'react'

import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  AccountDetailsFields,
  PersonalInformationFields,
  PreferencesFields,
  SignUpFormSchema,
} from '../sign-up-schema'

export default function Preferences() {
  const router = useRouter()
  const { trigger, getValues, control } = useFormContext<SignUpFormSchema>()

  useLayoutEffect(() => {
    const requiredAccountDetailsFields: AccountDetailsFields[] = [
      'password',
      'username',
    ]
    const requiredPersonalInformationFields: PersonalInformationFields[] = [
      'email',
      'firstName',
      'lastName',
    ]
    trigger(requiredPersonalInformationFields).then((value) => {
      if (!value) router.push('/sign-up')
      else
        trigger(requiredAccountDetailsFields).then((value) => {
          if (!value) router.push('/sign-up/account')
        })
    })
  }, [trigger, router])

  const handleSubmit = async () => {
    const requiredFields: PreferencesFields[] = ['experience', 'role']
    const isPreferencesValid = await trigger(requiredFields, {
      shouldFocus: true,
    })
    if (!isPreferencesValid) return
    console.log('form fields are valid', getValues())
    router.push('/success')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="developer" />
                      </FormControl>
                      <FormLabel className="font-normal">Developer</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="designer" />
                      </FormControl>
                      <FormLabel className="font-normal">Designer</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="manager" />
                      </FormControl>
                      <FormLabel className="font-normal">Manager</FormLabel>
                    </FormItem>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                    <SelectItem value="mid">Mid-Level (2-5 years)</SelectItem>
                    <SelectItem value="senior">Senior (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
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
