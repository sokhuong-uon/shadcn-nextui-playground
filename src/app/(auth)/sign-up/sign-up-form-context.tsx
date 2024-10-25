'use client'

import { ReactNode } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { SignUpFormSchema, signUpFormSchema } from './sign-up-schema'

export function SignUpFormProvider({ children }: { children: ReactNode }) {
  const form = useForm<SignUpFormSchema>({
    mode: 'all',
    resolver: zodResolver(signUpFormSchema),
  })

  return <FormProvider {...form}>{children}</FormProvider>
}
