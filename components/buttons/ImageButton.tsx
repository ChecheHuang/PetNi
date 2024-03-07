'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import { useHover } from 'usehooks-ts'

import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { FillImage } from '../fill-image'

interface ImageButtonProps extends ButtonProps {
  alt?: string
  imgUrl: string
  hoverImgUrl?: string
  isActive?: boolean
  imageClassName?: string
}

function ImageButton({
  alt = '/',
  imgUrl,
  hoverImgUrl = imgUrl,
  isActive = false,
  imageClassName,
  ...props
}: ImageButtonProps) {
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  return (
    <Button
      type="button"
      variant={isActive ? 'default' : 'primary'}
      ref={hoverRef}
      {...props}
    >
      <div
        className={cn(
          'flex h-[36px] w-[36px] items-center justify-center',
          imageClassName,
        )}
      >
        <FillImage src={isHover || isActive ? hoverImgUrl : imgUrl} alt={alt} />
      </div>
    </Button>
  )
}

export default ImageButton
