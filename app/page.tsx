'use client'

import Link from 'next/link'
import React from 'react'

import { FillImage } from '@/components/fill-image'

function Home() {
  return (
    <div className=" flex h-screen w-screen flex-col items-center justify-between ">
      <div />
      <Link href="/pair">
        <FillImage src="/images/petnilogo.gif" />
      </Link>
      <footer>PetNi &copy; Code:Carl Huang / Design:K.T </footer>
    </div>
  )
}

export default Home
