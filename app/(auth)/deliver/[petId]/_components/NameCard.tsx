'use client'

import React from 'react'
import { Control } from 'react-hook-form'

import { Card, cardClassName } from '@/components/ui/card'
import { FormControl, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { FormDataType } from './SettingForm'

type NameCardProps = {
  control: Control<FormDataType, any>
}

export default function NameCard({ control }: NameCardProps) {
  return (
    <Card className={cardClassName}>
      <div className="space-y-1.5">
        <div>牠的名字</div>
        <FormField
          control={control}
          name="name"
          render={({ field: { value, ...rest } }) => {
            const field = { value: value ? value : '', ...rest }
            return (
              <FormControl>
                <Input placeholder="若尚未取名可不填" {...field} />
              </FormControl>
            )
          }}
        />
      </div>
    </Card>
  )
}
