import prismadb from '@/lib/prismadb'

import 台中市 from './台中市.json'
import 台北市 from './台北市.json'
import 台南市 from './台南市.json'
import 花蓮縣 from './花蓮縣.json'

export const animalHospital = [...台北市, ...台中市, ...台南市, ...花蓮縣].map(
  (item) => ({
    ...item,
    isEmergency: Math.random() < 0.4,
  }),
)

const copyArr = <T>(array: T[], copyTime = 1): T[] => {
  const result = [] as T[]
  for (let i = 0; i < copyTime; i++) {
    result.push(...array)
  }
  return result
}

export const seedAnimalHospital = async (length = 2) => {
  for (const _ of Array(length)) {
    await prismadb.animalHospital.createMany({
      data: animalHospital,
    })
  }
  console.log('animalHospital count', await prismadb.animalHospital.count())
}
