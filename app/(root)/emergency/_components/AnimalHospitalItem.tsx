'use client'

import React from 'react'

import { AnimalHospital } from '@prisma/client'

import { FillImage } from '@/components/fill-image'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const AnimalHospitalItem = ({
  id,
  name,
  phone,
  address,
  isEmergency,
}: AnimalHospital) => {
  return (
    <Card
      key={id}
      className=" flex  h-full justify-between p-4 md:h-[104px] md:w-[363px]"
    >
      <div className="flex flex-col justify-between">
        <div>{name}</div>
        <div className="text-sm">{phone}</div>
        <div className="text-sm">{address}</div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <div className={cn('text-sm text-info', !isEmergency && 'opacity-0')}>
          *疫情期間有開
        </div>
        <div
          onClick={() => (window.location.href = `tel:${phone}`)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black"
        >
          <div className="h-6 w-6">
            <FillImage src="/images/icons/phone.png" />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default AnimalHospitalItem
