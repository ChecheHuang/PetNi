'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import { FillImage } from '@/components/fill-image'

import { GetPetsReturnType } from '../../../../actions/pet'
import DeliverCard from './DeliverCard'

const genderMap = {
  男生: 'male',
  女生: 'female',
  不明: 'unknown',
}

type PetCardProps = Prettify<
  GetPetsReturnType & {
    onDelete?: () => void
    onImageClick?: () => void
  }
>

function PetCard({
  id,
  imageUrl,
  name,
  city,
  area,
  gender,
  isPublish,
  onDelete,
  onImageClick,
}: PetCardProps) {
  return (
    <>
      <DeliverCard className="flex flex-col items-center p-3 ">
        <div className=" relative flex h-[132px] w-[138px] items-center justify-center overflow-hidden rounded-[28px] bg-[#c4a888] ">
          <X
            onClick={onDelete}
            className="absolute right-2 top-2 h-6 w-6 rounded-full bg-white  p-[4px] "
          />
          <FillImage
            onClick={onImageClick}
            className="rounded-[20px]"
            src={imageUrl}
            priority
          />
        </div>
        <div className="mt-[7px] flex h-6 w-full items-center justify-between">
          <h2 className="truncate font-bold">{!name ? '尚未取名' : name}</h2>
          <div className="h-[24px] w-[24px]">
            <FillImage
              src={`/images/icons/${
                genderMap[gender as keyof typeof genderMap]
              }.png`}
            />
          </div>
        </div>
        <div className="flex h-[24px] w-full items-center justify-between">
          <div className=" w-2/3 truncate text-xs  text-gray-400">
            {!area ? '尚未設置地址' : city + area}
          </div>
          {isPublish ? (
            <div className="h-[24px] w-[24px]">
              <FillImage
                src={`/images/icons/deliver${isPublish ? '-pink' : ''}.png`}
              />
            </div>
          ) : null}
        </div>
      </DeliverCard>
    </>
  )
}

export default PetCard
