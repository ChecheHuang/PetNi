import React from 'react'

import { Pet } from '@prisma/client'

import CustomButton from '@/components/buttons/CustomButton'
import { Button } from '@/components/ui/button'
import { Card, cardClassName } from '@/components/ui/card'

type AgeCardProps = {
  setAge: (age: '幼齡' | '成年') => void
} & Pick<Pet, 'age'>

export default function AgeCard({ setAge, age }: AgeCardProps) {
  return (
    <Card className={cardClassName}>
      <div className="space-y-1.5">
        <div>
          年齡<span className="text-info">(*必選)</span>
        </div>
        <div className=" flex gap-[11px]">
          <CustomButton
            className="h-[40px] w-[166px] "
            value={'幼齡'}
            activeValue={age}
            onClick={setAge}
          />
          <CustomButton
            className="h-[40px] w-[166px] "
            value={'成年'}
            activeValue={age}
            onClick={setAge}
          />
        </div>
      </div>
    </Card>
  )
}
