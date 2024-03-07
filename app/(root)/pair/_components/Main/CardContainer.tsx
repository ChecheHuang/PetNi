import React from 'react'

import { cn } from '@/lib/utils'

function CardContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-[500px]  items-center justify-center overflow-hidden ">
      <div
        className={cn(
          'absolute -z-10 h-[444.23px] w-[276.79px]  rounded-[32px] bg-white shadow-[0px_9px_11px_0px_#00000040]',
          'translate-x-4 translate-y-[3vw] rotate-[14deg] scale-[0.85]',
        )}
      />
      <div
        className={cn(
          'absolute -z-10 h-[444.23px] w-[276.79px]   rounded-[32px] bg-white shadow-[0px_9px_11px_0px_#00000040]',
          'flex translate-y-[-2vw] rotate-[14deg] scale-[0.92] items-center justify-center text-center text-lg text-info',
        )}
      >
        <div className="rotate-[-14deg] ">
          很抱歉!
          <br />
          已沒有單身狗、單身貓了，
          <br />
          請嘗試修改篩選條件
        </div>
      </div>

      {children}
    </div>
  )
}

export default CardContainer
