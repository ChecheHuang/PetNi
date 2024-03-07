'use client'

import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

import Loading from '../loading'

interface ModalProps {
  isOpen: boolean
  description: string
  footer: React.ReactNode
  onClose?: () => void
  isLoading?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  description,
  isOpen,
  footer,
  onClose,
  isLoading,
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }
  const onChange = (open: boolean) => {
    if (!open && onClose) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className=" flex h-[156px] w-[90vw] flex-col items-center md:w-[472px]  ">
        {/* {isLoading && <Loading className="absolute w-full" />} */}
        <DialogDescription className="mt-[39px]">
          {description}
        </DialogDescription>
        <DialogFooter className="mt-[18px]">{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
