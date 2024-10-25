import { z } from 'zod'

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
})

export const accountDetailsSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
})

export const preferencesSchema = z.object({
  role: z.enum(['developer', 'designer', 'manager'], {
    required_error: 'Please select a role',
  }),
  experience: z.enum(['junior', 'mid', 'senior'], {
    required_error: 'Please select an experience level',
  }),
})

export const formSchema = z.object({
  ...personalInfoSchema.shape,
  ...accountDetailsSchema.shape,
  ...preferencesSchema.shape,
})

export type FormData = z.infer<typeof formSchema>
export type PersonalInfo = z.infer<typeof personalInfoSchema>
export type AccountDetails = z.infer<typeof accountDetailsSchema>
export type Preferences = z.infer<typeof preferencesSchema>
