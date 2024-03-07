import { collectionRouter } from './routers/collectionRouter'
import { petRouter } from './routers/petRouter'
import { router } from './trpc'

export const appRouter = router({
  pet: petRouter,
  collection: collectionRouter,
})

export type AppRouter = typeof appRouter
