import React from 'react'

import NavItems from '@/components/NavItems'

function MobileBottomNavbar() {
  return (
    <header className=" fixed bottom-0 z-10 flex h-[56px] w-full items-center bg-white px-4  md:hidden ">
      <NavItems />
    </header>
  )
}

export default MobileBottomNavbar
