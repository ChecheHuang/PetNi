import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { getPet } from '@/actions/pet'
import MobileTopNavbarContainer from '@/components/Navbar/MobileTopNavbarContainer'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import ImageCard from './_components/ImageCard'
import SettingForm from './_components/SettingForm'

async function PetIdPage({ params: { petId } }: { params: { petId: string } }) {
  const pet = await getPet(petId)
  const { imageUrl, ...initData } = pet

  return (
    <>
      <MobileTopNavbarContainer className="flex items-center justify-between  px-4">
        <Link
          href="/deliver"
          className={cn(buttonVariants({ variant: 'ghost' }))}
        >
          <ChevronLeft className="cursor-pointer" />
        </Link>
        <div className="text-xl font-bold">編輯</div>
        <Button className=" opacity-0" variant="ghost">
          <ChevronLeft />
        </Button>
      </MobileTopNavbarContainer>
      <div className="flex min-h-[calc(100vh-77.53px)] flex-col items-center  justify-center gap-[13px] pt-[13px] md:flex-row md:items-start ">
        <ImageCard petId={petId} imageUrl={imageUrl} />
        <SettingForm petId={petId} initData={initData} />
      </div>
    </>
  )
}

export default PetIdPage
