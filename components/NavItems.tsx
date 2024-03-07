'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import { useHover } from 'usehooks-ts'

import { cn } from '@/lib/utils'

import { FillImage } from './fill-image'

function NavItems() {
  const routes = [
    {
      href: '/pair',
      alias: 'pair',
      label: '配對',
    },
    {
      href: '/collect',
      alias: 'collect',
      label: '收藏',
    },
    {
      href: '/theme',
      alias: 'theme',
      label: '主題館',
    },
    {
      href: '/deliver',
      alias: 'deliver',
      label: '送養',
    },
    {
      href: '/emergency',
      alias: 'emergency',
      label: '急診',
    },
  ]
  return (
    <div className="grid w-full grid-cols-5 items-center justify-items-center md:w-[470px] ">
      {routes.map((route) => (
        <NavItem key={route.alias} {...route} />
      ))}
    </div>
  )
}

export default NavItems

function NavItem({
  alias,
  label,
  href,
}: {
  alias: string
  label: string
  href: string
}) {
  const pathname = usePathname()
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  // const active = pathname === href
  const active = pathname.startsWith(href)

  const imgUrl =
    isHover || active
      ? `/images/icons/${alias}-pink.png`
      : `/images/icons/${alias}.png`
  return (
    <Link ref={hoverRef} className="group flex  gap-2 " href={href}>
      <div className="h-[25px] w-[25px]">
        <FillImage src={imgUrl} alt={alias} />
      </div>
      <span
        className={cn(
          ' overflow-hidden whitespace-nowrap  text-info group-hover:w-auto  ',
          'transition-all ',
          active ? 'w-auto' : 'w-0 ',
          'hidden md:flex ',
        )}
      >
        {label}
      </span>
    </Link>
  )
}
