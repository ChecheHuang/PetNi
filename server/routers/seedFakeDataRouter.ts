import { revalidatePath } from 'next/cache'


import { router, privateProcedure } from '../trpc'

export const seedFakeDataRouter = router({
  createPet: privateProcedure
    .mutation(async ({  ctx: { userId } }) => {
    
    }),
  
})
