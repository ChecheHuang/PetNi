'use client'

import React from 'react'
import { Control } from 'react-hook-form'

import { Card, cardClassName } from '@/components/ui/card'
import { FormControl, FormField } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

import { FormDataType } from './SettingForm'

type DescriptionCardProps = {
  control: Control<FormDataType, any>
}

export default function DescriptionCard({ control }: DescriptionCardProps) {
  return (
    <Card className={cardClassName}>
      <div className="space-y-1.5">
        <div>狀況</div>
        <FormField
          control={control}
          name="description"
          render={({ field: { value, ...rest } }) => {
            const field = { value: value ? value : '', ...rest }
            return (
              <FormControl>
                <Textarea
                  className="h-[118px] resize-none "
                  placeholder="限制40字"
                  {...field}
                />
              </FormControl>
            )
          }}
        />
      </div>
    </Card>
  )
}
