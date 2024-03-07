'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { GetPetReturnType } from '@/actions/pet'
import { useNavigateModal } from '@/app/(auth)/_components/NavigateModal'
import { trpcQuery } from '@/components/providers/trpcProvider'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { petFormSchema } from '@/lib/validations/petValidation'

import AgeCard from './AgeCard'
import CategoryGenderCard from './CategoryGenderCard'
import ContactCard from './ContactCard'
import DescriptionCard from './DescriptionCard'
import FurColorCard from './FurColorCard'
import NameCard from './NameCard'

export type FormDataType = Omit<GetPetReturnType, 'imageUrl'>

type SettingFormProps = {
  initData: FormDataType
  petId: string
}

export default function SettingForm({ initData, petId }: SettingFormProps) {
  const form = useForm<FormDataType>({
    defaultValues: initData,
  })
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const control = form.control
  const { gender, category, age, furColor, city } = form.watch()
  const router = useRouter()
  const { onOpen } = useNavigateModal()

  const { mutate: update, isLoading: isUpdating } =
    trpcQuery.pet.updatePet.useMutation({
      onSuccess: () => {
        toast.success('更新成功')
        router.refresh()
        setErrorMessage(null)
        onOpen(petId)
        // router.push(`/deliver`)
      },
    })

  function onSubmit(values: FormDataType) {
    try {
      const data = petFormSchema.parse({ petId, ...values })
      update(data)
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error('請先確認必選欄位填寫正確')
        setErrorMessage('*必填項目尚未填寫完，請填寫完整後再發佈。')
      }
    }
  }
  const setValue = (name: keyof FormDataType) => (value: string) => {
    form.setValue(name, value)
  }

  return (
    <>
      <Form {...form}>
        <form
          className="mb-[90px] flex flex-col gap-[13px]  md:mb-0 md:flex-row "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-3">
            <CategoryGenderCard
              gender={gender}
              category={category}
              setGender={setValue('gender')}
              setCategory={setValue('category')}
            />
            <AgeCard age={age} setAge={setValue('age')} />
            <NameCard control={control} />
            <FurColorCard
              category={category}
              furColor={furColor}
              setFurColor={setValue('furColor')}
            />
          </div>
          <div className="space-y-3">
            <ContactCard
              resetArea={() => form.setValue('area', '')}
              control={control}
              city={city}
            />
            <DescriptionCard control={control} />
            <Button
              isLoading={isUpdating}
              disabled={isUpdating}
              className="w-full"
              type="submit"
            >
              {initData.isPublish ? '更新' : '發布'}
            </Button>
            {errorMessage && (
              <div className="mt-[24px] w-[381px] break-words text-[20px] text-info ">
                *必填項目尚未填寫完，請填寫完整後再發佈。
              </div>
            )}
          </div>
        </form>
      </Form>
    </>
  )
}
