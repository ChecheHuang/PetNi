'use client'

import React from 'react'

import { GetPetsReturnType } from '@/actions/pet'
import { useDeleteModal } from '@/app/(auth)/_components/DeleteModal'
import { useNavigateModal } from '@/app/(auth)/_components/NavigateModal'

import PetCard from './PetCard'

type ActionPetCardProps = Prettify<
  GetPetsReturnType & {
    onDelete?: () => void
    onImageClick?: () => void
  }
>

function ActionPetCard(props: ActionPetCardProps) {
  const id = props.id
  const { onOpen: onDeleteModalOpen } = useDeleteModal()
  const { onOpen: onNavigateModalOpen } = useNavigateModal()
  const handleDelete = () => {
    onDeleteModalOpen(id)
  }
  const handleImageClick = () => {
    onNavigateModalOpen(id)
  }

  return (
    <PetCard
      {...props}
      onImageClick={handleImageClick}
      onDelete={handleDelete}
    />
  )
}

export default ActionPetCard
