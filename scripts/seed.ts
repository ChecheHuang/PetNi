import { PrismaClient } from '@prisma/client'

import { seedAnimalHospital } from './model/animalHospital'
import { generateCreatePets } from './model/pet'
import { seedTheme } from './model/theme'
import { seedUser } from './model/user'

const prismadb = new PrismaClient()

const reset = async () => {
  await prismadb['user'].deleteMany()
  await prismadb['animalHospital'].deleteMany()
  await prismadb['pet'].deleteMany()
  await prismadb['theme'].deleteMany()
}
const seed = async () => {
  console.log('seeding...')
  const userId = await seedUser()
  console.log('userId', userId)
  await generateCreatePets(90, userId)
  console.log('pet count', await prismadb.pet.count())
  await seedAnimalHospital()
  console.log('animalHospital count', await prismadb.animalHospital.count())
  await seedTheme()
  console.log('theme count', await prismadb.theme.count())
}

async function main() {
  try {
    await reset()
    await seed()
    console.log('Success')
  } catch (error) {
    console.log('Error seeding the database ', error)
  } finally {
    await prismadb.$disconnect()
  }
}

main()
