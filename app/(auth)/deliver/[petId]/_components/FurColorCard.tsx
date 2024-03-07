'use client'

import React from 'react'

import { Pet } from '@prisma/client'

import CustomButton from '@/components/buttons/CustomButton'
import { Card, cardClassName } from '@/components/ui/card'
import { catFurColorOptions, dogFurColorOptions } from '@/config/options'

type FurColorCardProps = {
  setFurColor: (furColor: string) => void
} & Pick<Pet, 'furColor' | 'category'>

export default function FurColorCard({
  setFurColor,
  furColor,
  category,
}: FurColorCardProps) {
  const options = category === '貓' ? catFurColorOptions : dogFurColorOptions

  if (!category) return null
  return (
    <Card className={cardClassName}>
      <div className="space-y-1.5">
        <div>
          毛色<span className="text-info">(*必選)</span>
        </div>
        <div className=" grid grid-cols-3 gap-2.5">
          {options.map((option) => (
            <CustomButton
              key={option}
              className="h-[40px] w-[90px] md:w-[110px] "
              value={option}
              activeValue={furColor}
              onClick={setFurColor}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
