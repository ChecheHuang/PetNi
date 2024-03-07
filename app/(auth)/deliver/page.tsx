import { getPets } from '@/actions/pet'
import { getUserAuth } from '@/app/api/auth/[...nextauth]/authOptions'
import MobileTopNavbarContainer from '@/components/Navbar/MobileTopNavbarContainer'

import LogoutButton from '../_components/LogoutButton'
import ActionPetCard from './_components/ActionPetCard'
import UploadCard from './_components/UploadCard'

async function DeliverPage() {
  const pets = await getPets()
  const session = await getUserAuth()

  return (
    <>
      <MobileTopNavbarContainer className="flex items-center justify-end  px-4">
        <LogoutButton
          image={session?.user?.image as string}
          name={session?.user?.name as string}
        />
      </MobileTopNavbarContainer>
      <div className="grid grid-cols-2 items-center justify-items-center gap-3 pt-[30px] md:grid-cols-4 md:px-[87px] lg:grid-cols-6  ">
        <UploadCard />
        {pets.map((pet) => (
          <ActionPetCard key={pet.id} {...pet} />
        ))}
      </div>
    </>
  )
}

export default DeliverPage
