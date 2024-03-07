'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { FaAngleLeft } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'

const MobliePrevButton = () => {
  const router = useRouter()
  return (
    <Button
      variant="ghost"
      className="group absolute left-[16px] top-6 h-12 w-12 rounded-full bg-[#00000030] md:hidden "
      onClick={() => {
        router.back()
      }}
    >
      <FaAngleLeft className="h-6 w-6 text-white group-hover:text-info" />
    </Button>
  )
}

export default MobliePrevButton
