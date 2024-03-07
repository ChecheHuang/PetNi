'use client'

import { Cloud, File, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Dropzone from 'react-dropzone'
import { toast } from 'sonner'

import { FillImage } from '@/components/fill-image'
import { trpcQuery } from '@/components/providers/trpcProvider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'

import { useUpload } from '../_hooks/useUpload'
import DeliverCard from './DeliverCard'

function UploadCard() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()
  const { onUploading, isUploading, uploadProgress } = useUpload()

  const { mutateAsync: createNewPet } = trpcQuery.pet.createPet.useMutation({
    onSuccess: (id) => {
      toast.success('上傳成功')
      setIsOpen(false)
      router.refresh()
      router.push(`/deliver/${id}`)
    },
  })

  const onDrop = async (acceptedFile: File[]) => {
    try {
      const imageUrl = await onUploading(acceptedFile)
      await createNewPet({ imageUrl })
    } catch (error: unknown) {
      toast.error(JSON.stringify(error))
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <DeliverCard className="flex  flex-col items-center justify-center gap-2.5 ">
          <div className="h-[56px] w-[56px]">
            <FillImage src={'/images/deliver/Vector.png'} />
          </div>

          <div className="text-sm text-info">上傳寵物照片</div>
        </DeliverCard>
      </DialogTrigger>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle>上傳寵物照片</DialogTitle>
          <DialogDescription>
            <Dropzone multiple={false} onDrop={onDrop}>
              {({ getRootProps, getInputProps, acceptedFiles }) => (
                <section>
                  <div
                    {...getRootProps()}
                    className="m-4 h-64 rounded-lg border border-dashed border-gray-300"
                  >
                    <div className="flex h-full w-full items-center justify-center">
                      <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                          <Cloud className="mb-2 h-6 w-6 text-zinc-500" />
                        </div>
                        {acceptedFiles && acceptedFiles[0] ? (
                          <div className="flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-[1px] outline-zinc-200">
                            <div className="grid h-full place-items-center px-3 py-2">
                              <File className="h-4 w-4 text-blue-500" />
                            </div>
                            <div className="h-full truncate px-3 py-2 text-sm">
                              {acceptedFiles[0].name}
                            </div>
                          </div>
                        ) : null}
                        {isUploading ? (
                          <div className="mx-auto mt-4 w-full max-w-xs">
                            <Progress
                              indicatorColor={
                                uploadProgress === 100
                                  ? 'bg-green-500'
                                  : 'bg-info'
                              }
                              value={uploadProgress}
                              className="h-1 w-full bg-zinc-200"
                            />
                            {uploadProgress === 100 ? (
                              <div className="flex items-center justify-center gap-1 pt-2 text-center text-sm text-zinc-700">
                                <Loader2 className="h-3 w-3 animate-spin" />
                                Redirecting...
                              </div>
                            ) : null}
                          </div>
                        ) : (
                          <div>拖曳或點擊上傳</div>
                        )}
                      </label>
                      <input
                        {...getInputProps()}
                        type="file"
                        className="hidden"
                      />
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default UploadCard
