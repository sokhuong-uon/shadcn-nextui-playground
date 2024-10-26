'use client'

import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

export function StepIndicator() {
  return (
    <ul className="mx-auto flex w-80 max-w-lg justify-evenly">
      <StepIndicatorItem path="/sign-up">1</StepIndicatorItem>
      <StepIndicatorItem path="/sign-up/account">2</StepIndicatorItem>
      <StepIndicatorItem path="/sign-up/preferences">3</StepIndicatorItem>
    </ul>
  )
}

function StepIndicatorItem({
  path,
  children,
}: PropsWithChildren<{ path: string }>) {
  const pathname = usePathname()
  return (
    <li
      className={` ${pathname === path ? 'bg-blue-500 font-bold text-white' : 'text-neutral-500'} flex h-10 w-10 items-center justify-center rounded-full ring-1`}
    >
      {children}
    </li>
  )
}
