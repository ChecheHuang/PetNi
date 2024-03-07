'use client'

import { MotionProps, motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { set } from 'zod'

import { GetThemesReturnType } from '@/actions/theme'
import { FillImage } from '@/components/fill-image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { useFilterPet } from '../../pair/_components/Sidebar'

const ClientThemePage = (themes: GetThemesReturnType) => {
  const filterPet = useFilterPet()
  const router = useRouter()
  const [currentCategory, setCurrentCategory] = useState<'貓' | '犬'>('貓')
  const [showIndex, setShowIndex] = useState(0)
  const { category, furColor, imgUrl, description } =
    themes[currentCategory][showIndex]
  const [isShow, setIsShow] = useState(true)
  const [x, setX] = useState(0)
  const toggleCategory = () => {
    setCurrentCategory((prev) => {
      if (prev === '貓') return '犬'
      return '貓'
    })
    setX(0)
    setShowIndex(0)
  }

  useEffect(() => {
    setIsShow(false)
    setTimeout(() => {
      setIsShow(true)
    }, 200)
  }, [currentCategory, showIndex])

  const onNext = () => {
    setX(-100)
    setShowIndex((prev) => {
      if (prev + 1 >= themes[currentCategory].length) {
        return 0
      }
      return prev + 1
    })
  }
  const onPrev = () => {
    setX(100)
    setShowIndex((prev) => {
      if (prev - 1 < 0) {
        return themes[currentCategory].length - 1
      }
      return prev - 1
    })
  }

  const handleSearch = ({
    furColor,
    category,
  }: {
    furColor: string
    category: string
  }) => {
    filterPet.updateSettingData({
      furColor,
      category,
    })
    router.push('/pair')
  }

  return (
    <div className=" max-w-screen relative  flex min-h-[calc(100vh-77.53px)]  justify-center  overflow-hidden    ">
      <div className="pointer-events-none absolute left-1/2  top-1/2 -z-10 hidden h-[309.44px] w-[304.11px] -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-info/25 p-4 md:flex ">
        <FillImage
          src={`/images/theme/text-${
            currentCategory === '貓' ? 'cat' : 'dog'
          }.png`}
        />
      </div>
      <div className="absolute top-0 flex h-[62px] w-screen items-center justify-center bg-white md:right-[130px] md:top-[40px] md:h-auto md:w-auto">
        <div className=" z-50 h-[30px]  w-[132px] rounded-[10px] bg-white shadow-[0px_2px_7px_0px_#0A0A0A12]  ">
          <button
            className={cn(
              'h-full w-1/2 rounded-[10px] text-sm',
              currentCategory === '貓' && ' bg-black text-sm text-white ',
            )}
            onClick={toggleCategory}
          >
            喵星人
          </button>
          <button
            className={cn(
              'h-full w-1/2 rounded-[10px] text-sm',
              currentCategory === '犬' && ' bg-black text-sm text-white ',
            )}
            onClick={toggleCategory}
          >
            汪星人
          </button>
        </div>
      </div>

      <div className="absolute bottom-1/2 z-50 flex h-[42px]  w-full justify-between px-4  md:bottom-[40px] md:right-[130px] md:w-[108px] md:px-0   ">
        <button className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-white shadow-[0px_2px_7px_0px_#0A0A0A12]">
          <ChevronLeft onClick={onPrev} className="text-bold h-6 w-6" />
        </button>
        <button className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-white shadow-[0px_2px_7px_0px_#0A0A0A12]">
          <ChevronRight onClick={onNext} className="text-bold h-6 w-6" />
        </button>
      </div>
      {isShow && (
        <div className="mt-[62px] flex h-[calc(100vh-140px)]  w-screen flex-col-reverse  justify-center md:mt-0 md:h-full md:flex-row md:gap-[300px] ">
          <motion.div
            initial={{ opacity: 0, x }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex w-screen flex-col justify-center pl-4  md:w-[350px]  md:pl-[60px] "
          >
            <h1 className="text-[20px] font-bold md:text-[72px]">
              {furColor + category}
            </h1>
            <div className=" h-[67px] text-base text-[#878787] md:h-[54px] md:text-lg">
              {description}
            </div>
            <Button
              onClick={() => handleSearch({ furColor, category })}
              variant="ghost"
              className="group mx-auto flex h-[46px] w-[196px] justify-between rounded-[16px] bg-white pl-[28px] pr-[10px] shadow-[0px_2px_7px_0px_#0A0A0A12] md:mx-0 md:mt-[37px]  "
            >
              搜尋{furColor + category}
              <div className="flex h-[37px] w-[37px] items-center justify-center rounded-[16px] bg-black text-white transition-all group-hover:bg-white group-hover:text-info ">
                <Search className="h-6 w-6 " />
              </div>
            </Button>
          </motion.div>
          <div className="flex items-center justify-center   ">
            <motion.div
              initial={{ opacity: 0, x: x * 3 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="h-[352px] w-[250px] md:h-[642px] md:w-[457px]  "
            >
              <FillImage src={imgUrl} />
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientThemePage
