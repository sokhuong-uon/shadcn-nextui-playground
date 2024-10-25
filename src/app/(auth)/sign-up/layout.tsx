import { PropsWithChildren } from 'react'

import { SignUpFormProvider } from './sign-up-form-context'

export default function SignUPLayout({ children }: PropsWithChildren) {
  return (
    <SignUpFormProvider>
      <div className="flex h-dvh w-dvw items-center justify-center">
        <div className="container py-8">
          <div className="mx-auto w-full max-w-lg">{children}</div>
        </div>
      </div>
    </SignUpFormProvider>
  )
}
