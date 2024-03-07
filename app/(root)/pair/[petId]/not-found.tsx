import React from 'react'

import PrevButton from '@/components/buttons/PrevButton'

function NotFound() {
  return (
    <div className="mt-4 flex w-full items-center justify-center gap-2">
      該寵物尚未發布
      <PrevButton />
    </div>
  )
}

export default NotFound
