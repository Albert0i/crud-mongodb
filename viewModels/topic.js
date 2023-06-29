import { z } from 'zod'

export const topicSchema = z.object({
    title: z.string().nonempty(),    
    description: z.string().min(12)
  })

/*
   Zod
   https://zod.dev/

*/  