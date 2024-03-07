'use client'

import { useEffect, useState } from 'react'

import { GetCollectionsReturnType } from '@/actions/collection'
import { storage } from '@/lib/storage'

import Cards from './Cards'

function ClientCollect() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  const pets = storage.get('collections') || ([] as GetCollectionsReturnType[])

  if (pets.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-info text-3xl  mt-24"> 您還沒有收藏~</h1>
      </div>
    )
  }

  return <Cards pets={pets} />
}

export default ClientCollect
