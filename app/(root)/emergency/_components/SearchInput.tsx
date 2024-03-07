'use client'

import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { useDebounce, useQueryString } from '@/hooks/useHooks'
import { cn } from '@/lib/utils'

const SearchInput = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [value, setValue] = useState('')
  const hospital = useDebounce(value)

  const { setSearchParams } = useQueryString()
  useEffect(() => {
    setSearchParams({
      hospital,
    })
  }, [hospital, setSearchParams])
  return (
    <div className={cn('relative', className)} {...rest}>
      <Search className="absolute left-3 top-3 h-4 w-4 text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full rounded-md bg-slate-100  pl-7  focus-visible:ring-slate-200"
        placeholder="找醫院......"
      />
    </div>
  )
}

export default SearchInput
