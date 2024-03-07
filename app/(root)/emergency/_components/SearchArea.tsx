'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import { useQueryString } from '@/hooks/useHooks'

import SearchInput from './SearchInput'

const SearchArea = () => {
  const options = ['北部', '中部', '南部', '東部']

  const { setSearchParams, reset, searchParams } = useQueryString()

  const onClick = (option: string) => {
    setSearchParams({
      area: option,
    })
  }

  return (
    <div className="sticky top-0 flex justify-center bg-[#f8f8f8] px-2 py-[16px] md:px-0">
      <div className="space-y-[9px]">
        <div className="flex w-full justify-between gap-3 ">
          {options.map((option) => {
            const isSelected = searchParams.area === option
            return (
              <Button
                className="h-[38px] md:w-[95px]"
                variant={isSelected ? 'info' : 'outline'}
                onClick={() => onClick(option)}
                key={option}
              >
                {option}
              </Button>
            )
          })}
        </div>
        <div className="flex  justify-between gap-3">
          <SearchInput className="w-full" />
          <Button onClick={reset}>Reset</Button>
        </div>
        <div className="flex justify-end ">
          *資訊僅供參考，建議先電話聯絡再前往。
        </div>
      </div>
    </div>
  )
}

export default SearchArea
