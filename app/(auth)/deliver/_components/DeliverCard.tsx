import React from 'react'

import { cn } from '@/lib/utils'

function DeliverCard({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        ' h-[214px] w-[162px]  cursor-pointer  rounded-[28px] bg-white p-2.5 shadow-[0px_2px_7px_0px_#0A0A0A12]',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default DeliverCard
