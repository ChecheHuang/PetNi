import { z } from 'zod'

export const petFormSchema = z.object({
  petId: z.string(),
  category: z.string(),
  gender: z.string(),
  age: z.string(),
  furColor: z.string(),
  phone: z.string(),
  city: z.string(),
  area: z.string().min(1),
  name: z.string(),
  description: z.string(),
})
