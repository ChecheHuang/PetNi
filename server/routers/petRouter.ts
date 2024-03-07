import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'

import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query'
import prismadb from '@/lib/prismadb'
import { petFormSchema } from '@/lib/validations/petValidation'

import { router, publicProcedure, privateProcedure } from '../trpc'

export const petRouter = router({
  createPet: privateProcedure
    .input(z.object({ imageUrl: z.string() }))
    .mutation(async ({ input: { imageUrl }, ctx: { userId } }) => {
      const { id } = await prismadb.pet.create({
        data: {
          userId,
          imageUrl,
        },
      })
      return id
    }),
  updatePetImage: privateProcedure
    .input(
      z.object({
        petId: z.string(),
        imageUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { petId, imageUrl } = input
      await prismadb.pet.update({
        where: {
          id: petId,
        },
        data: {
          imageUrl,
        },
      })
      return
    }),
  updatePet: privateProcedure
    .input(petFormSchema)
    .mutation(async ({ input }) => {
      const { petId, ...rest } = input
      await prismadb.pet.update({
        where: {
          id: petId,
        },
        data: {
          ...rest,
          isPublish: true,
        },
      })
      return
    }),
  deletePet: privateProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      await prismadb.pet.delete({
        where: {
          id: input,
        },
      })
    } catch (err) {}
  }),
  getPairPets: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        userId: z.string().optional(),
        category: z.string().optional(),
        gender: z.string().optional(),
        furColor: z.string().optional(),
        isNearBy: z.boolean().optional(),
        age: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { cursor } = input
      const limit = input.limit ?? INFINITE_QUERY_LIMIT
      const { userId, category, gender, furColor, isNearBy, age } = input

      const pairPets = await prismadb.pet.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        select: {
          id: true,
          imageUrl: true,
          gender: true,
          name: true,
          city: true,
          area: true,
        },
        where: {
          isPublish: true,
          ...(category && { category }),
          ...(gender && { gender }),
          ...(furColor && { furColor }),
          ...(age && { age }),
          // ...(userId && { userId }),
          // ...(isNearBy && { isNearBy }),
        },
      })
      let nextCursor: typeof cursor | undefined = undefined
      if (pairPets.length > limit) {
        const nextItem = pairPets.pop()
        nextCursor = nextItem?.id
      }
      // console.log(pairPets)
      return { pairPets, nextCursor }
    }),
})
