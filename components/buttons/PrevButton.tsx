'use client'

import { useRouter } from 'next/navigation'

import { Button, ButtonProps } from '@/components/ui/button'

interface PrevButtonProps extends ButtonProps {
  content?: string
}

const PrevButton: React.FC<PrevButtonProps> = ({ content = '回上一頁' }) => {
  const router = useRouter()
  return <Button onClick={() => router.back()}>{content}</Button>
}

export default PrevButton
