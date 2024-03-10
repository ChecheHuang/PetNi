'use client'

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

import { GetCollectionsReturnType } from '@/actions/collection'
import SimpleBar from '@/components/SimpleBar'
import Loading from '@/components/loading'
import { trpcClient, trpcQuery } from '@/components/providers/trpcProvider'
import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query'
import { storage } from '@/lib/storage'

import { MobileSidebar } from '../MobileSidebar'
import { useFilterPet } from '../Sidebar'
import BottomArea from './BottomArea'
import DropCardArea from './DropCardArea'

function Main({ userId }: { userId?: string }) {
  const {
    settingData: { isSound, ...rest },
  } = useFilterPet()

  const queryData = {
    ...rest,
    userId,
  }

  const isLogin = useSession().status === 'authenticated'

  const [currentShowId, setCurrentShowId] = useState('')
  const { data, isLoading, fetchNextPage, refetch } =
    trpcQuery.pet.getPairPets.useInfiniteQuery(
      {
        ...queryData,
        limit: INFINITE_QUERY_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        keepPreviousData: true,
      },
    )
  const pairPets = data?.pages.flatMap((page) => page.pairPets) || []

  // useEffect(() => {
  //   if (!isLogin) return
  //   ;(async () => {
  //     if (!storage.get('collections')) return

  //     const collections: GetCollectionsReturnType[] =
  //       storage.get('collections') || []

  //     await Promise.all(
  //       collections.map(async (item) => {
  //         trpcClient.collection.createCollection.mutate({
  //           petId: item.id,
  //           isLike: true,
  //         })
  //       }),
  //     )
  //     storage.remove('collections')
  //     refetch()
  //   })()
  // }, [isLogin, refetch])

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loading />
      </div>
    )
  return (
    <div className=" item-center flex h-[calc(100vh-77.53px)] w-screen flex-col  justify-center   md:w-[867px] ">
      <div className="md:hidden">
        <MobileSidebar />
      </div>
      <SimpleBar>
        <DropCardArea
          setCurrentShowId={setCurrentShowId}
          fetchNextPage={fetchNextPage}
          pairPets={pairPets}
        />
        <BottomArea pairPets={pairPets} currentShowId={currentShowId} />
      </SimpleBar>
    </div>
  )
}

export default Main
