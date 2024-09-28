import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

import { onEnvValidationError } from './error-handler'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
  },
  onValidationError: onEnvValidationError,
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_BASE_URL:
      // eslint-disable-next-line n/no-process-env
      process.env.NEXT_PUBLIC_BASE_URL,
  },
})
