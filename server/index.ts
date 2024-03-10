import { collectionRouter } from './routers/collectionRouter'
import { petRouter } from './routers/petRouter'
import { seedFakeDataRouter } from './routers/seedFakeDataRouter'
import { router } from './trpc'

export const appRouter = router({
  pet: petRouter,
  collection: collectionRouter,
  seedFakeData:seedFakeDataRouter
})

export type AppRouter = typeof appRouter
