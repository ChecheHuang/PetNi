import { notFound } from 'next/navigation'

import { getUserAuth } from '@/app/api/auth/[...nextauth]/authOptions'
import prismadb from '@/lib/prismadb'

export const getCollections = async () => {
  const session = await getUserAuth()
  if (!session) throw new Error('Unauthorized')
  const userId = session.user.id as string
  const collections = (
    await prismadb.collection.findMany({
      where: {
        userId,
      },
      select: {
        pet: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            city: true,
            area: true,
            gender: true,
          },
        },
      },
    })
  ).map(({ pet }) => pet)
  return collections
}
export type GetCollectionsReturnType = GetArrType<
  GetAsyncFnReturnType<typeof getCollections>
>

export const getCollection = async (petId: string) => {
  const session = await getUserAuth()
  if (!session) throw new Error('Unauthorized')

  const userId = session.user.id as string
  const collection = await prismadb.collection.findFirst({
    where: {
      petId,
      userId,
    },
    select: {
      pet: {
        select: {
          imageUrl: true,
          category: true,
          gender: true,
          age: true,
          name: true,
          furColor: true,
          phone: true,
          city: true,
          area: true,
          description: true,
        },
      },
    },
  })
  if (!collection) return notFound()
  return collection.pet
}
export type GetPetReturnType = GetAsyncFnReturnType<typeof getCollection>
