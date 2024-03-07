import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { FaAngleLeft } from 'react-icons/fa6'

import { getPet } from '@/actions/pet'
import { getUserAuth } from '@/app/api/auth/[...nextauth]/authOptions'
import { FillImage } from '@/components/fill-image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import MobliePrevButton from './_components/MobliePrevButton'

export default async function DetailsPage({
  params: { petId },
}: {
  params: { petId: string }
}) {
  const pet = await getPet(petId)
  const session = await getUserAuth()

  const {
    imageUrl,
    name,
    city = '',
    area,
    age,
    gender,
    furColor,
    category,
    phone,
    description,
    isPublish,
    _count: { collections },
  } = pet
  if (!isPublish) return notFound()

  const genderMap = {
    男生: 'male',
    女生: 'female',
    不明: 'unknown',
  }

  return (
    <div className="flex flex-col justify-center gap-[26px] md:mt-[35px] md:flex-row ">
      <div className="bg-linear relative flex h-[274px] w-full flex-col items-center justify-center overflow-hidden bg-white md:h-[579px] md:w-[428px] md:flex-row md:rounded-[32px] md:p-[18px]">
        <MobliePrevButton />
        <FillImage className="rounded-[32px]" src={imageUrl} />
      </div>
      <div className=" z-10 mt-[-90px] flex w-full flex-col gap-[13px] px-[13px] md:mt-0 md:h-[579px] md:w-[425px] md:justify-between md:gap-0 md:px-0">
        <div className="flex w-full items-center justify-between  text-white  md:text-black">
          <div>
            <div className="text-lg ">{name}</div>
            <div className="text-sm">
              {city}
              {area}
            </div>
          </div>
          {session?.user.id === pet.userId ? (
            <Link
              href={`/deliver/${petId}`}
              className="flex h-[56px] w-[56px] cursor-pointer items-center justify-center rounded-full bg-white"
            >
              <div className="h-[24px] w-[24px]">
                <FillImage src="/images/icons/edi.png" />
              </div>
            </Link>
          ) : (
            <div className="flex h-[56px] w-[56px] cursor-pointer items-center justify-center rounded-full bg-white">
              <div className="h-[24px] w-[24px]">
                <FillImage src="/images/icons/love_S.png" />
              </div>
            </div>
          )}
        </div>
        <Card className=" h-[103px] w-full  rounded-[20px] p-6">
          <div className="flex items-center justify-between text-xl font-bold">
            <div>{name}</div>
            <div>{collections}</div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div>{age}</div>
            <div>follows</div>
          </div>
        </Card>
        <Card className=" flex h-[148px] w-full items-center justify-around rounded-[20px] p-6">
          <div className="flex flex-col items-center gap-[7px]">
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#F8F8F8]">
              <div className="h-[24px] w-[24px]">
                <FillImage src="/images/icons/status.png" />
              </div>
            </div>
            <div>求包養</div>
          </div>
          <div className="flex flex-col items-center gap-[7px]">
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#F8F8F8]">
              <div className="h-[24px] w-[24px]">
                <FillImage
                  src={`/images/icons/${
                    genderMap[gender as keyof typeof genderMap]
                  }.png`}
                />
              </div>
            </div>
            <div>{gender}</div>
          </div>
          <div className="flex flex-col items-center gap-[7px]">
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#F8F8F8]">
              <Image
                src="/images/icons/theme-pink.png"
                width={24}
                height={24}
                alt=""
              />
            </div>
            <div>
              {furColor}
              {category}
            </div>
          </div>
        </Card>
        <Card className=" space-y-2.5 rounded-[20px] p-6 md:h-[202px]">
          <div>{phone}</div>
          <div>
            {city}
            {area}
          </div>
          <div className="text-sm">{description}</div>
        </Card>
      </div>
    </div>
  )
}
