'use client'

import { usePathname } from 'next/navigation'
import { PropsWithChildren, useContext } from 'react'

import { motion } from 'framer-motion'

import {
  SignUpContext,
  getSignUpStepBasedOnPath,
} from './components/sign-up-step-context'

export default function SignUpFormTransitionTemplate({
  children,
}: PropsWithChildren) {
  const stepContext = useContext(SignUpContext)
  const pathname = usePathname()

  if (!stepContext) {
    return children
  }

  const currentStep = getSignUpStepBasedOnPath(pathname)

  console.log('step context', stepContext)
  const delta = currentStep - stepContext.step
  console.log('delta', delta)
  // stepContext.setStep(currentStep)

  return (
    <motion.div
      initial={{ x: delta === 0 ? 0 : delta > 0 ? 30 : -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
