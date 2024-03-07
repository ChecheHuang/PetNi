'use client'

import Lottie from 'lottie-react'
import React from 'react'

import { cn } from '@/lib/utils'

import loadingAnimate from './毛線球_loading.json'

function Loading({
  className,
  isLoading = true,
}: {
  className?: string
  isLoading?: boolean
}) {
  if (!isLoading) return null
  return (
    <Lottie
      className={cn('backdrop-blur', className)}
      animationData={loadingAnimate}
      loop={true}
    />
  )
}

export default Loading
