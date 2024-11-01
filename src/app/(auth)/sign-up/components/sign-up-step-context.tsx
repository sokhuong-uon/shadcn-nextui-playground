'use client'

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from 'react'

type SignUpStep = {
  step: number
  setStep: Dispatch<SetStateAction<number>>
}

export const getSignUpStepBasedOnPath = (pathname: string) => {
  return pathname.startsWith('/sign-up/preferences')
    ? 3
    : pathname.startsWith('/sign-up/account')
      ? 2
      : 1
}

export const SignUpContext = createContext<SignUpStep | undefined>(undefined)

export function SignUpStepProvider({
  children,
  initialStep,
}: PropsWithChildren<{ initialStep: number }>) {
  const [step, setStep] = useState(initialStep)

  return (
    <SignUpContext.Provider
      value={{
        setStep,
        step,
      }}
    >
      {children}
    </SignUpContext.Provider>
  )
}
