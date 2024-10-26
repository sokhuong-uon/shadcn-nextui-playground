import { PropsWithChildren } from 'react'

import { SignUpFormProvider } from './sign-up-form-context'
import { StepIndicator } from './step-indicator'

export default function SignUPLayout({ children }: PropsWithChildren) {
  return (
    <SignUpFormProvider>
      <div className="flex h-dvh w-dvw items-center justify-center">
        <div className="container relative flex flex-col items-center justify-center gap-12 py-8">
          <StepIndicator />
          <div className="mx-auto w-full max-w-lg">{children}</div>
        </div>
      </div>
    </SignUpFormProvider>
  )
}
