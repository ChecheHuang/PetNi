'use client'

import React from 'react'

import { Button, ButtonProps } from '@/components/ui/button'

type CustomButtonProps<T> = {
  value: T
  activeValue: any
  onClick: (value: T) => void
  text?: string
} & Omit<ButtonProps, 'onClick' | 'value' | 'type' | 'variant'>

export default function CustomButton<T extends string>({
  value,
  activeValue,
  onClick,
  text = value,
  ...rest
}: CustomButtonProps<T>) {
  const isActive = value === activeValue
  return (
    <Button
      onClick={() => {
        onClick(value)
      }}
      type="button"
      variant={isActive ? 'default' : 'primary'}
      {...rest}
    >
      {text}
    </Button>
  )
}
