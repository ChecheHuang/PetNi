'use client'

import Link from 'next/link'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Navbar from '@/components/Navbar/Navbar'
import SimpleBar from '@/components/SimpleBar'
import { FillImage } from '@/components/fill-image'

import MobileBottomNavbar from '../../components/Navbar/MobileBottomNavbar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar>
        <Link className=" h-[53.53px] w-[118.11px]  " href="/">
          <FillImage src="/images/logo.png" alt="logo" priority />
        </Link>
      </Navbar>
      <MobileBottomNavbar />
      <main className="h-[calc(100vh-77.53px)]  ">
        <SimpleBar>
          <MaxWidthWrapper>{children}</MaxWidthWrapper>
        </SimpleBar>
      </main>
    </>
  )
}

export default DashboardLayout
