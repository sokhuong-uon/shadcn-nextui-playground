'use client'

import { PropsWithChildren } from 'react'

import { FormProvider } from './sign-up-form-context'

export default function SignUPLayout({ children }: PropsWithChildren) {
  return (
    <FormProvider>
      <div className="flex h-dvh w-dvw items-center justify-center">
        <div className="container py-8">
          <div className="mx-auto w-full max-w-lg">{children}</div>
        </div>
      </div>
    </FormProvider>
  )
}
