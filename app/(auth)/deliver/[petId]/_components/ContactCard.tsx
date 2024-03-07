'use client'

import { Control } from 'react-hook-form'

import { Card, cardClassName } from '@/components/ui/card'
import { FormControl, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cityOptions } from '@/config/options'

import { FormDataType } from './SettingForm'

type ContactCardProps = {
  control: Control<FormDataType, any>
  city: string | null
  resetArea: () => void
}

export default function ContactCard({
  control,
  city,
  resetArea,
}: ContactCardProps) {
  return (
    <Card className={cardClassName}>
      <div className="space-y-3">
        <div>
          聯絡方式<span className="text-info">(*必選)</span>
        </div>
        <FormField
          control={control}
          name="phone"
          render={({ field: { value, ...rest } }) => {
            const field = { value: value ? value : '', ...rest }
            return (
              <FormControl>
                <Input
                  placeholder="聯絡方式(電話、通訊等等．．．)"
                  {...field}
                />
              </FormControl>
            )
          }}
        />

        <div className="flex gap-2 ">
          <FormField
            control={control}
            name="city"
            render={({ field: { value, onChange } }) => {
              return (
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      resetArea()
                      onChange(value)
                    }}
                    value={value ? value : ''}
                  >
                    <SelectTrigger className={value ? '' : 'text-[#DEDEDE]'}>
                      <SelectValue placeholder="選擇縣市" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>選擇縣市</SelectLabel>
                        {Object.keys(cityOptions)?.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              )
            }}
          />
          <FormField
            control={control}
            name="area"
            render={({ field: { value, onChange } }) => {
              return (
                <FormControl>
                  <Select
                    disabled={city === null}
                    onValueChange={onChange}
                    value={value ? value : ''}
                  >
                    <SelectTrigger className={value ? '' : 'text-[#DEDEDE]'}>
                      <SelectValue placeholder="選擇區別" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>選擇區別</SelectLabel>
                        {city !== ''
                          ? cityOptions[city as keyof typeof cityOptions].map(
                              (city) => (
                                <SelectItem key={city} value={city}>
                                  {city}
                                </SelectItem>
                              ),
                            )
                          : null}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              )
            }}
          />
        </div>
      </div>
    </Card>
  )
}
