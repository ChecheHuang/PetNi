'use client'

import Image, { ImageProps } from 'next/image'
import React, { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

type FillImageProps = Override<
  ImageProps,
  {
    alt?: string
  }
>

export function FillImage({
  src: defaultSrc,
  alt = '',
  className,
  ...rest
}: FillImageProps) {
  const loseImgUrl = '/images/loseImg.png'
  const [src, setSrc] = useState(defaultSrc)
  useEffect(() => {
    setSrc(defaultSrc)
  }, [defaultSrc])

  return (
    <Image
      className={className}
      placeholder="blur"
      blurDataURL={loseImgUrl}
      src={src}
      alt={alt}
      width="0"
      height="0"
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
      onError={() => setSrc(loseImgUrl)}
      {...rest}
    />
  )
}
