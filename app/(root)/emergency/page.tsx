import { Suspense } from 'react'

import Loading from '@/components/loading'
import { removeUndefinedAndNullAndEmpty } from '@/lib/utils'

import { getAnimalHospitalList } from './_action/animalHospital'
import AnimalHospitalList from './_components/AnimalHospitalList'
import SearchArea from './_components/SearchArea'

interface EmergencyPageProps {
  searchParams: {
    area: string
    hospital: string
  }
}

async function EmergencyPage({
  searchParams: { area, hospital },
}: EmergencyPageProps) {
  const animalHospitalList = await getAnimalHospitalList(
    removeUndefinedAndNullAndEmpty({ area, hospital }),
  )

  return (
    <div>
      <SearchArea />
      <Suspense fallback={<Loading />}>
        <AnimalHospitalList animalHospitalList={animalHospitalList} />
      </Suspense>
    </div>
  )
}

export default EmergencyPage
