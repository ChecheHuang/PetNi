'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { create } from 'zustand'

import SimpleBar from '@/components/SimpleBar'
import CustomButton from '@/components/buttons/CustomButton'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, Form } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { catFurColorOptions, dogFurColorOptions } from '@/config/options'
import { cn } from '@/lib/utils'

import ImageButton from '../../../../components/buttons/ImageButton'
import { useSheet } from './MobileSidebar'

type SettingFormType = {
  category: string
  gender: string
  age: string
  furColor: string
  isNearBy: boolean
  isSound: boolean
}
interface useFilterPetStore {
  settingData: Partial<SettingFormType>
  setSettingData: (settingData: Partial<SettingFormType>) => void
  updateSettingData: (settingData: Partial<SettingFormType>) => void
}

export const useFilterPet = create<useFilterPetStore>((set) => ({
  settingData: {},
  setSettingData: (settingData: Partial<SettingFormType>) =>
    set({ settingData }),
  updateSettingData: (settingData: Partial<SettingFormType>) =>
    set((state) => ({
      settingData: {
        ...state.settingData,
        ...settingData,
      },
    })),
}))
function Sidebar({ className }: { className?: string }) {
  const { settingData: initData, setSettingData: setData } = useFilterPet()
  const { setIsOpen } = useSheet()
  const form = useForm<SettingFormType>({
    defaultValues: initData,
  })
  const { category, gender, age, furColor } = form.watch()
  const options = category === '貓' ? catFurColorOptions : dogFurColorOptions

  const setValue = (name: keyof SettingFormType) => (value: string) => {
    form.setValue(name, value)
  }
  function onSubmit(values: SettingFormType) {
    setData(values)
    toast.success('套用成功')
    setIsOpen(false)
  }

  return (
    <div
      className={cn(
        'relative h-full w-[screen]  bg-[#FAFAFA]  shadow-[0px_2px_7px_0px_#0A0A0A12]  ',
        'md:h-[calc(100vh-77.53px)]  md:w-[413px] md:pl-[87px]',
        className,
      )}
    >
      <SimpleBar>
        <Form {...form}>
          <form
            className="flex flex-col gap-2 px-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div>
              <h1 className=" mb-2 font-medium">我想尋找</h1>
              <div className="flex flex-wrap  justify-between">
                <ImageButton
                  size="big"
                  alt="cat"
                  imgUrl={`/images/icons/cat-dark.png`}
                  hoverImgUrl={`/images/icons/cat.png`}
                  isActive={category === '貓'}
                  onClick={() => {
                    setValue('category')('貓')
                  }}
                />
                <ImageButton
                  size="big"
                  alt="cat"
                  imgUrl={`/images/icons/dog-dark.png`}
                  hoverImgUrl={`/images/icons/dog.png`}
                  isActive={category === '犬'}
                  onClick={() => {
                    setValue('category')('犬')
                  }}
                />
                <CustomButton
                  value=""
                  text="不拘"
                  activeValue={category}
                  onClick={setValue('category')}
                  size="big"
                />
              </div>
            </div>
            <div>
              <h1 className=" mb-2 font-medium">性別</h1>
              <div className="flex flex-wrap  justify-between">
                <ImageButton
                  size="big"
                  imgUrl="/images/icons/male.png"
                  isActive={gender === '男生'}
                  onClick={() => setValue('gender')('男生')}
                />
                <ImageButton
                  size="big"
                  imgUrl="/images/icons/female.png"
                  isActive={gender === '女生'}
                  onClick={() => setValue('gender')('女生')}
                />
                <CustomButton
                  value={''}
                  text={'不拘'}
                  activeValue={gender}
                  onClick={() => setValue('gender')('')}
                  size="big"
                />
              </div>
            </div>
            <div>
              <h1 className=" mb-2 font-medium">年齡</h1>
              <div className="flex flex-wrap  justify-between">
                {[
                  { text: '幼年', value: '幼齡' },
                  {
                    text: '成年',
                    value: '成年',
                  },
                  {
                    text: '不拘',
                    value: '',
                  },
                ].map(({ text, value }) => {
                  return (
                    <CustomButton
                      key={value}
                      value={value}
                      text={text}
                      activeValue={age}
                      onClick={setValue('age')}
                      size="normal"
                    />
                  )
                })}
              </div>
            </div>
            {category === '犬' || category === '貓' ? (
              <div>
                <h1 className=" mb-2 font-medium">顏色</h1>
                <div className="flex flex-wrap  justify-between gap-3">
                  {options.map((option) => (
                    <CustomButton
                      key={option}
                      value={option}
                      text={option + category}
                      activeValue={furColor}
                      onClick={setValue('furColor')}
                      size="normal"
                    />
                  ))}
                  <CustomButton
                    value=""
                    text="不拘"
                    activeValue={furColor}
                    onClick={setValue('furColor')}
                    size="normal"
                  />
                </div>
              </div>
            ) : null}

            <div className="mt-2 flex justify-between">
              <h1 className=" font-medium">搜尋附近</h1>
              <FormField
                control={form.control}
                name="isNearBy"
                render={({ field }) => {
                  return (
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  )
                }}
              />
            </div>
            <div className="mt-2 flex justify-between">
              <h1 className=" font-medium">互動音效</h1>
              <FormField
                control={form.control}
                name="isSound"
                render={({ field }) => {
                  return (
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  )
                }}
              />
            </div>
            <Button
              type="submit"
              className={cn('sticky bottom-0 ', 'md:bottom-auto md:mt-2')}
            >
              套用
            </Button>
          </form>
        </Form>
      </SimpleBar>
    </div>
  )
}

export default Sidebar
