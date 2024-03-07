'use client'

import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { create } from 'zustand'

import { Modal } from '@/components/modals/modal'
import { trpcQuery } from '@/components/providers/trpcProvider'
import { cn } from '@/lib/utils'

interface useDeleteModalStore {
  isOpen: boolean
  petId: string
  onOpen: (petId: string) => void
  onClose: () => void
}

export const useDeleteModal = create<useDeleteModalStore>((set) => ({
  isOpen: false,
  petId: '',
  onOpen: (petId: string) => set({ isOpen: true, petId }),
  onClose: () => set({ isOpen: false, petId: '' }),
}))

export default function DeleteModal() {
  const { isOpen, onClose, petId } = useDeleteModal()
  const router = useRouter()

  const { mutate, isLoading } = trpcQuery.pet.deletePet.useMutation({
    onSuccess: () => {
      toast.success('刪除成功')
      router.refresh()
      onClose()
    },
  })

  const onConfirm = () => {
    if (petId === '') return
    mutate(petId)
  }

  return (
    <Modal
      isOpen={isOpen}
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
            onClick={onConfirm}
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
  )
}
