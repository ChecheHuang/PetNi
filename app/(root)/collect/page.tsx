import { getCollections } from '@/actions/collection'
import { getUserAuth } from '@/app/api/auth/[...nextauth]/authOptions'

import Cards from './_components/Cards'
import ClientCollect from './_components/ClientCollect'

async function Page() {
  const session = await getUserAuth()
  if (!session) return <ClientCollect />
  const pets = await getCollections()
  return <Cards pets={pets} />
}

export default Page
