'use client'

import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from 'framer-motion'
import { X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

import { GetCollectionsReturnType } from '@/actions/collection'
import { FillImage } from '@/components/fill-image'
import { TrpcOutputs, trpcQuery } from '@/components/providers/trpcProvider'
import { storage } from '@/lib/storage'
import { cn } from '@/lib/utils'

import { useFilterPet } from '../Sidebar'

type DefaultProps = GetArrType<TrpcOutputs['pet']['getPairPets']['pairPets']>

type CardProps = DefaultProps & {
  index: number
  fetchNextPage?: () => void
  setCurrentShowId: React.Dispatch<React.SetStateAction<string>>
}

function Card(props: CardProps) {
  const {
    settingData: { isSound, category },
  } = useFilterPet()
  const categoryMap = {
    貓: 'cat',
    犬: 'dog',
  }

  const categoryValue = category
    ? categoryMap[category as keyof typeof categoryMap]
    : '吹口哨'
  categoryMap[category as keyof typeof categoryMap]
  const audio = isSound ? new Audio(`/source/${categoryValue}.m4a`) : null
  const { id, imageUrl, gender, city, area, name } = props
  const { index, fetchNextPage, setCurrentShowId } = props
  const isLogin = useSession().status === 'authenticated'

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-100, 0, 100], [-15, -3, 15])
  const opacity = useTransform([x, y], ([xValue, yValue]: number[]) => {
    const totalDistance = Math.sqrt(xValue ** 2 + yValue ** 2)
    const opacityValue = 1 - totalDistance / 1000
    return opacityValue < 0.8 ? 0.8 : opacityValue
  })
  const control = useAnimation()

  const { mutate: createCollection } =
    trpcQuery.collection.createCollection.useMutation()

  const handleLike = (isLike: boolean) => async () => {
    audio && audio.play()
    setCurrentShowId(id)
    control.start({
      x: isLike ? 1000 : -1000,
      y: isLike ? 200 : -200,
      transition: { duration: 0.5 },
    })
    fetchNextPage && fetchNextPage()
    if (!isLogin && isLike) {
      const localStorageCollections = (storage.get('collections') ||
        []) as GetCollectionsReturnType[]
      const isExist = localStorageCollections.some((item) => item.id === id)
      if (isExist) return
      const collections: GetCollectionsReturnType[] = [
        ...localStorageCollections,
        {
          id: id,
          imageUrl: props.imageUrl,
          gender: props.gender,
          name: props.name,
          city: props.city,
          area: props.area,
        },
      ]
      storage.set('collections', collections)
      return
    }

    createCollection({
      petId: id,
      isLike,
    })
  }
  const genderSrcMap = {
    男生: '/images/icons/male.png',
    女生: '/images/icons/female.png',
    不明: '/images/icons/unknown.png',
  }

  return (
    <motion.div
      className={cn(
        'absolute box-content flex h-[444.23px]  w-[276.79px]   cursor-pointer items-center justify-center  overflow-hidden rounded-[32px] border-[0.9375vw] border-white bg-gradient-to-b from-slate-100 to-black ',
        index < 4 && 'shadow-[-6px_9px_11px_0px_#00000040]',
      )}
      animate={control}
      drag
      // dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={(event, { point: { x } }) => {
        const windowWidth = window.innerWidth
        const likeThreshold = windowWidth * 0.65
        const dislikeThreshold = windowWidth * 0.5
        if (x > likeThreshold) return handleLike(true)()
        if (x < dislikeThreshold) return handleLike(false)()
        control.start({
          x: 0,
          y: 0,
          transition: { duration: 0.5 },
        })
      }}
      style={{ x: x, y: y, rotate, opacity }}
      onDrag={(event, info) => {
        const { x, y } = info.point
      }}
    >
      <FillImage className=" pointer-events-none" src={imageUrl} alt="" />
      <div className="absolute bottom-12 left-1/2  flex h-[54px] w-[245px]  -translate-x-[115px]  transform items-center justify-between">
        <div
          onClick={handleLike(false)}
          className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-white"
        >
          <X />
        </div>
        <div className="min-w-[94px] text-white">
          <div className="flex items-center justify-between text-lg ">
            {name}
            <span className="h-[24px] w-[24px]">
              <FillImage
                src={genderSrcMap[gender as keyof typeof genderSrcMap]}
              />
            </span>
          </div>
          <div className="text-sm">{city || '' + area}</div>
        </div>
        <div
          onClick={handleLike(true)}
          className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-white"
        >
          <div className="h-[31px] w-[31px]">
            <FillImage src="/images/icons/love_S.png" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Card
