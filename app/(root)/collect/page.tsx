import { getCollections } from '@/actions/collection'
import { getUserAuth } from '@/app/api/auth/[...nextauth]/authOptions'

import Cards from './_components/Cards'
import ClientCollect from './_components/ClientCollect'

async function Page() {
  const session = await getUserAuth()
  if (!session) return <ClientCollect />
  const pets = await getCollections()
  if (pets.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-info text-3xl  mt-24"> 您還沒有收藏~</h1>
      </div>
    )
  }
  return <Cards pets={pets} />
}

export default Page
