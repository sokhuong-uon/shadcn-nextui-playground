'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, useContext } from 'react'

import { SignUpContext, getSignUpStepBasedOnPath } from './sign-up-step-context'

export function StepIndicator() {
  return (
    <ul className="mx-auto flex w-80 max-w-lg justify-evenly">
      <StepIndicatorItem href="/sign-up">1</StepIndicatorItem>
      <StepIndicatorItem href="/sign-up/account">2</StepIndicatorItem>
      <StepIndicatorItem href="/sign-up/preferences">3</StepIndicatorItem>
    </ul>
  )
}

function StepIndicatorItem({
  href,
  children,
  ...props
}: PropsWithChildren<LinkProps<string>>) {
  const pathname = usePathname()
  const stepContext = useContext(SignUpContext)

  const currentStep = getSignUpStepBasedOnPath(pathname)
  stepContext?.setStep(currentStep)

  return (
    <li>
      <Link
        {...props}
        href={href}
        prefetch
        className={` ${pathname === href ? 'bg-blue-500 font-bold text-white' : 'text-neutral-500'} pointer-events-none flex h-10 w-10 items-center justify-center rounded-full ring-1`}
      >
        {children}
      </Link>
    </li>
  )
}
