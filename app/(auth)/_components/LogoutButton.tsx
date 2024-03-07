'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function LogoutButton({ name = 'CN', image }: { name: string; image: string }) {
  const router = useRouter()
  return (
    <Button
      onClick={() => {
        signOut({ redirect: false }).then(() => {
          router.push('/')
        })
      }}
      variant="ghost"
      className="flex h-auto cursor-pointer items-center gap-[15px] text-info"
    >
      <Avatar>
        <AvatarImage src={image} alt="" />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      登出
    </Button>
  )
}

export default LogoutButton
