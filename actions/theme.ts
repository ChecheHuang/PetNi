import { Theme } from '@prisma/client'

import prismadb from '@/lib/prismadb'

export const getThemes = async () => {
  const theme = await prismadb.theme.findMany()

  const result = theme.reduce(
    (acc, pet) => {
      if (!acc[pet.category]) {
        acc[pet.category] = [pet]
      } else {
        acc[pet.category].push(pet)
      }
      return acc
    },
    {} as Record<string, Theme[]>,
  )

  return result
}

export type GetThemesReturnType = GetAsyncFnReturnType<typeof getThemes>
