import { ZodError } from 'zod'

export const onEnvValidationError = (error: ZodError) => {
  console.error(
    '❌ Invalid environment variables:',
    error.flatten().fieldErrors
  )
  process.exit(1)
}
