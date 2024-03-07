import { AnimalHospital } from '@prisma/client'

import prismadb from '@/lib/prismadb'

export const getAnimalHospitalList = async ({
  area,
  hospital,
}: {
  area: string
  hospital: string
}) => {
  const animalHospitals = await prismadb.animalHospital.findMany({
    where: {
      area,
      name: {
        contains: hospital,
      },
    },
  })
  // console.log(animalHospitals)
  const map = {} as Record<string, any>
  const result = animalHospitals.reduce(
    (acc, cur) => {
      const { city } = cur
      if (map[city]) {
        map[city]['animalHospitals'].push(cur)
      } else {
        map[city] = {
          city,
          animalHospitals: [cur],
        }
        acc = [...acc, map[city]]
      }

      return acc
    },
    [] as Record<string, any>[],
  )
  return result as {
    city: string
    animalHospitals: AnimalHospital[]
  }[]
}
