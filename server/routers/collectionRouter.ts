import { z } from 'zod'

import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'

import prismadb from '@/lib/prismadb'

import { router, publicProcedure, privateProcedure } from '../trpc'

export const collectionRouter = router({
  createCollection: privateProcedure
    .input(z.object({ petId: z.string(), isLike: z.boolean() }))
    .mutation(async ({ input: { petId, isLike }, ctx: { userId } }) => {
      await prismadb.collection.upsert({
        where: {
          userId_petId: {
            userId,
            petId,
          },
        },
        create: {
          userId,
          petId,
          isLike,
        },
        update: {
          isLike,
        },
      })
    }),
  deleteCollection: privateProcedure
    .input(z.object({ petId: z.string() }))
    .mutation(async ({ ctx: { userId }, input: { petId } }) => {
      await prismadb.collection.deleteMany({
        where: {
          petId,
          userId,
        },
      })
    }),
})
