import React from 'react'

import { TrpcOutputs } from '@/components/providers/trpcProvider'

import Card from './Card'
import CardContainer from './CardContainer'

type PairPetsType = TrpcOutputs['pet']['getPairPets']['pairPets']
function DropCardArea({
  pairPets,
  fetchNextPage,
  setCurrentShowId,
}: {
  setCurrentShowId: React.Dispatch<React.SetStateAction<string>>
  pairPets: PairPetsType
  fetchNextPage: () => void
}) {
  return (
    <CardContainer>
      {pairPets.toReversed().map((pet, index) => {
        return (
          <Card
            key={pet.id}
            fetchNextPage={index === 1 ? fetchNextPage : undefined}
            index={index}
            setCurrentShowId={setCurrentShowId}
            {...pet}
          />
        )
      })}
    </CardContainer>
  )
}

export default DropCardArea
