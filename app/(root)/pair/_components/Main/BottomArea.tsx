import { MotionProps, motion, AnimatePresence } from 'framer-motion'
import React from 'react'

import { FillImage } from '@/components/fill-image'
import { TrpcOutputs } from '@/components/providers/trpcProvider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type PairPetsType = TrpcOutputs['pet']['getPairPets']['pairPets']

function BottomArea({
  pairPets,
  currentShowId,
}: {
  pairPets: PairPetsType
  currentShowId: string
}) {
  const findIndex = pairPets.findIndex((pet) => pet.id === currentShowId) || 0
  const index = findIndex === -1 ? 0 : findIndex
  const showPairPets = pairPets.slice(index, index + 3)
  const genderSrcMap = {
    男生: '/images/icons/male.png',
    女生: '/images/icons/female.png',
    不明: '/images/icons/unknown.png',
  }
  return (
    <div className="hidden h-[120px] items-center justify-between  px-4 md:flex">
      {showPairPets.map(({ id, imageUrl, name, gender, city, area }, index) => {
        return (
          <div
            key={id}
            className=" flex h-[70px] w-[247px] cursor-pointer gap-[11px] rounded-[23px] bg-[#FFFFFF] p-[12px] shadow-[0px_2px_7px_0px_#0A0A0A12]"
          >
            <Avatar>
              <AvatarImage src={imageUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="flex h-1/2 items-center gap-1 font-bold ">
                {name}
                <div className="h-[24px] w-[24px]">
                  <FillImage
                    src={genderSrcMap[gender as keyof typeof genderSrcMap]}
                  />
                </div>
              </div>
              <div className="flex h-1/2 items-center  text-xs text-[#878787]">
                {city} {area}
              </div>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}

export default BottomArea
