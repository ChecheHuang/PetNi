'use client'

import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { GetCollectionsReturnType } from '@/actions/collection'
import PetCard from '@/app/(auth)/deliver/_components/PetCard'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Modal } from '@/components/modals/modal'
import { trpcQuery } from '@/components/providers/trpcProvider'
import { storage } from '@/lib/storage'
import { cn } from '@/lib/utils'

type CardProps = GetCollectionsReturnType[]

const Cards = ({ pets }: { pets: CardProps }) => {
  const [deleteId, setDeleteId] = useState<string | undefined>()
  const isLogin = useSession().status === 'authenticated'

  const router = useRouter()
  const handleImageClick = (id: string) => {
    router.push(`/pair/${id}`)
  }
  const handleDelete = (id: string) => {
    setDeleteId(id)
  }
  const onClose = () => {
    setDeleteId(undefined)
  }
  const onSuccess = () => {
    toast.success('刪除成功')
    router.refresh()
    onClose()
  }

  const { mutate: deleteCollection, isLoading } =
    trpcQuery.collection.deleteCollection.useMutation({
      onSuccess,
    })

  const handleDeleteModalConfirm = () => {
    if (deleteId === undefined) return
    if (!isLogin) {
      const localStorageCollections = (storage.get('collections') ||
        []) as GetCollectionsReturnType[]
      const newCollections = localStorageCollections.filter(
        (item) => item.id !== deleteId,
      )
      storage.set('collections', newCollections)
      onSuccess()
      return
    }
    deleteCollection({ petId: deleteId })
  }

  return (
    <>
      <Modal
        isOpen={!!deleteId}
        onClose={onClose}
        description="確定要刪除我嗎 ？ಥ_ಥ"
        footer={
          <>
            <button
              onClick={onClose}
              className="flex h-[42px] w-[117px] cursor-pointer items-center justify-center rounded hover:bg-info/10"
            >
              取消
            </button>
            <button
              disabled={isLoading}
              onClick={handleDeleteModalConfirm}
              className={cn(
                'flex h-[42px] w-[117px] cursor-pointer items-center justify-center rounded text-info hover:bg-info/10',
                isLoading && 'cursor-not-allowed opacity-50',
              )}
            >
              {isLoading && (
                <Loader2 className="mr-2 h-5 w-5 animate-spin text-info" />
              )}
              確定
            </button>
          </>
        }
      />
      <MaxWidthWrapper>
        <div className="grid grid-cols-2 items-center justify-items-center gap-3 pt-[30px] md:grid-cols-4 md:px-[87px] lg:grid-cols-6  ">
          {pets.map((pet, index) => {
            return (
              <PetCard
                {...pet}
                key={index}
                onDelete={() => handleDelete(pet.id)}
                onImageClick={() => handleImageClick(pet.id)}
              />
            )
          })}
        </div>
      </MaxWidthWrapper>
    </>
  )
}

export default Cards
