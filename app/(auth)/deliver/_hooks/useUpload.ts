import { useState } from 'react'

import { useUploadThing } from '@/lib/uploadthing'

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const { startUpload } = useUploadThing('image')

  const startSimulatedProgress = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval)
          return prevProgress
        }
        return prevProgress + 5
      })
    }, 500)
    return interval
  }

  const onUploading = async (acceptedFile: File[]) => {
    setIsUploading(true)
    const progressInterval = startSimulatedProgress()
    const res = await startUpload(acceptedFile)
    if (!res) throw new Error('上傳失敗')
    const [fileResponse] = res
    const imageUrl = fileResponse.url
    clearInterval(progressInterval)
    setUploadProgress(100)
    setIsUploading(false)
    return imageUrl
  }
  return {
    onUploading,
    isUploading,
    uploadProgress,
  }
}
