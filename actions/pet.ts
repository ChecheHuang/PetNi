import { notFound } from 'next/navigation'

import { getUserAuth } from '@/app/api/auth/[...nextauth]/authOptions'
import prismadb from '@/lib/prismadb'

export const getPets = async () => {
  const session = await getUserAuth()
  if (!session) throw new Error('Unauthorized')

  const userId = session.user.id as string
  const pets = await prismadb.pet.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true,
      city: true,
      area: true,
      gender: true,
      isPublish: true,
    },
    where: {
      userId,
    },
  })
  return pets
}
export type GetPetsReturnType = Prettify<
  PartialByKey<GetArrType<GetAsyncFnReturnType<typeof getPets>>, 'isPublish'>
>

export const getPet = async (petId: string) => {
  const pet = await prismadb.pet.findUnique({
    select: {
      userId: true,
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
      isPublish: true,
      _count: {
        select: { collections: true },
      },
    },
    where: {
      id: petId,
    },
  })
  if (!pet) return notFound()

  return pet
}
export type GetPetReturnType = GetAsyncFnReturnType<typeof getPet>
