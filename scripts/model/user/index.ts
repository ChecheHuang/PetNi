import { PrismaClient } from '@prisma/client'

import { defaultPets, generateCreatePets } from '../pet'

const prismadb = new PrismaClient()

export const seedUser = async () => {
  const firstUser = {
    id: 'test',
    name: 'name',
    email: 'email',
    // pets: await generateCreatePets(200),
  }
  const firstUserData = await prismadb.user.create({
    data: firstUser,
  })
  return firstUserData.id
}
