'use client'

import React, { useEffect, useRef, useState } from 'react'

import { AnimalHospital } from '@prisma/client'

import { FillImage } from '@/components/fill-image'
import { Button } from '@/components/ui/button'

import AnimalHospitalItem from './AnimalHospitalItem'

type AnimalHospitalListType = {
  city: string
  animalHospitals: AnimalHospital[]
}
type AnimalHospitalListProps = {
  animalHospitalList: AnimalHospitalListType[]
}

const AnimalHospitalList = ({
  animalHospitalList,
}: AnimalHospitalListProps) => {
  const [list, setList] = useState<AnimalHospitalListType[]>([
    animalHospitalList[0],
  ])
  const scrollRef = useRef<HTMLDivElement>(null)
  const handleScroll = () => {
    if (scrollRef.current) {
      const containerHeight =
        scrollRef.current.scrollTop + scrollRef.current.clientHeight
      const scrollHeight = scrollRef.current.scrollHeight
      if (scrollHeight - containerHeight < 200) {
        setList((prevList) => {
          if (prevList.length === animalHospitalList.length) return prevList
          const nextItem = animalHospitalList[prevList.length]
          return [...prevList, nextItem]
        })
      }
    }
  }
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (scrollRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        scrollRef.current.removeEventListener('scroll', handleScroll)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    setList([animalHospitalList[0]])
    scrollRef.current?.scrollTo(0, 0)
  }, [animalHospitalList])

  if (!animalHospitalList.length) return <div>沒有資料</div>
  return (
    <>
      <div
        ref={scrollRef}
        className=" scrollbar-hide overflow-auto px-4   md:h-[calc(100vh-77.53px-180px)] md:px-[88px]"
      >
        {list.map((cityGroup, index) => (
          <div className="space-y-2" key={index}>
            <div className="flex items-center ">
              <div className="h-[23px] w-[24px]">
                <FillImage src="/images/icons/city.png" alt="city" />
              </div>
              <div className="text-xl font-bold">{cityGroup?.city}</div>
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              {cityGroup?.animalHospitals?.map((animalHospital) => {
                return (
                  <AnimalHospitalItem
                    key={animalHospital.id}
                    {...animalHospital}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        variant="info"
        className="fixed bottom-[5%] right-[10%] hidden h-16 w-16 rounded-full md:flex "
      >
        Top
      </Button>
    </>
  )
}

export default AnimalHospitalList
