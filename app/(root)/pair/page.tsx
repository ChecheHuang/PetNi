import React from 'react'

import { getUserAuth } from '@/app/api/auth/[...nextauth]/authOptions'

import Main from './_components/Main'
import Sidebar from './_components/Sidebar'

async function PairPage() {
  const session = await getUserAuth()

  return (
    <>
      <div className="flex ">
        <Sidebar className="hidden md:flex md:h-[calc(100vh-77.53px)]  md:w-[413px] md:pl-[87px]" />
        <Main />
      </div>
    </>
  )
}

export default PairPage
