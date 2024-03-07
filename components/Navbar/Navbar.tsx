'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import NavItems from '@/components/NavItems'
import { cn } from '@/lib/utils'

function Navbar({ children }: { children: React.ReactNode }) {
  const session = useSession()
  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-10  bg-[#FFFFFF] shadow-[0px_1px_9px_0px_#2626260D] ',
          'hidden md:flex ',
        )}
      >
        <MaxWidthWrapper className="h-[77.53px]">
          <div className="flex h-full  items-center justify-between px-[87px]">
            {children}
            {/* {session.status} */}
            <NavItems />
          </div>
        </MaxWidthWrapper>
      </header>
    </>
  )
}

export default Navbar
