import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

import { onEnvValidationError } from './error-handler'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']),
  },
  onValidationError: onEnvValidationError,
  emptyStringAsUndefined: true,
  // eslint-disable-next-line n/no-process-env
  experimental__runtimeEnv: process.env,
})
