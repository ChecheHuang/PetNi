import { Pet } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

import {
  genderOptions,
  cityOptions,
  dogFurColorOptions,
  catFurColorOptions,
  ageOptions,
} from '@/config/options'
import prismadb from '@/lib/prismadb'

export const defaultPets = [
  {
    imageUrl: '/images/seed/cat.png',
    category: '貓',
    gender: '女生',
    age: '幼齡',
    furColor: '橘',
    phone: '0912345678',
    city: '新北市',
    area: '板橋區',
    name: '我是貓貓',
    description:
      '我是貓貓我是貓貓我是貓貓我是貓貓我是貓貓我是貓貓我是貓貓我是貓貓我是貓貓我是貓貓我是貓貓我是貓貓我是貓貓我是貓貓我是貓貓我是貓貓我是貓貓我是貓貓',
    isPublish: true,
  },
  {
    imageUrl: '/images/seed/dog.png',
    category: '犬',
    gender: '男生',
    age: '成年',
    furColor: '雙色',
    phone: '0912345678',
    city: '臺北市',
    area: '中正區',
    name: '我是狗狗',
    description:
      '我是狗狗我是狗狗我是狗狗我是狗狗我是狗狗我是狗狗我是狗狗我是狗狗我是狗狗我是狗狗我是狗狗我是狗狗我是狗狗我是狗狗我是狗狗我是狗狗我是狗狗我是狗狗我是狗狗',
    isPublish: true,
  },
  {
    imageUrl: '/images/seed/dog2.png',
  },
]

function generateRandomChineseDescription() {
  const chineseWords = [
    '今天',
    '天氣',
    '很好',
    '我們',
    '一起',
    '去',
    '公園',
    '吃',
    '美食',
    '喝',
    '咖啡',
    '聊天',
    '感覺',
    '很',
    '愉快',
  ]

  const randomWordCount = Math.floor(Math.random() * 10) + 1
  const randomWords = Array.from({ length: randomWordCount }, () => {
    const randomIndex = Math.floor(Math.random() * chineseWords.length)
    return chineseWords[randomIndex]
  })

  return randomWords.join('')
}

function getRandomFromArray<T>(array: T[]) {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}
function generateRandomPhoneNumber() {
  const prefix = '09'
  const randomNumber = Math.floor(Math.random() * 100000000) // 生成 0 到 99999999 之間的數字
  const paddedNumber = randomNumber.toString().padStart(8, '0') // 將數字補齊為 8 位

  return `${prefix}${paddedNumber}`
}

function createRandomCatGenerator(userId: string) {
  let count = 0
  return async function getRandomCatImage() {
    const response = await fetch('https://api.thecatapi.com/v1/images/search')
    const [data] = await response.json()
    const imageUrl = data.url
    const name = `貓咪${count + 1}號`
    const category = '貓'
    const gender = getRandomFromArray(genderOptions)
    const age = getRandomFromArray(ageOptions)
    const furColor = getRandomFromArray(catFurColorOptions)
    const phone = generateRandomPhoneNumber()
    const description = generateRandomChineseDescription()
    const isPublish = Math.random() < 0.8
    const city = getRandomFromArray(
      Object.keys(cityOptions),
    ) as keyof typeof cityOptions
    const area = getRandomFromArray(cityOptions[city])
    count++
    return {
      imageUrl,
      name,
      category,
      gender,
      age,
      furColor,
      phone,
      city,
      area,
      description,
      isPublish,
      userId,
    } as Pet
  }
}
function createRandomDogGenerator(userId: string) {
  let count = 0
  return async function getRandomDogImage() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random')
    const data = await response.json()
    const imageUrl = data.message
    const name = `狗狗${count + 1}號`
    const category = '犬'
    const gender = getRandomFromArray(genderOptions)
    const age = getRandomFromArray(ageOptions)
    const furColor = getRandomFromArray(dogFurColorOptions)
    const phone = generateRandomPhoneNumber()
    const description = generateRandomChineseDescription()
    const isPublish = Math.random() < 0.8
    const city = getRandomFromArray(
      Object.keys(cityOptions),
    ) as keyof typeof cityOptions
    const area = getRandomFromArray(cityOptions[city])
    count++

    return {
      imageUrl,
      name,
      category,
      gender,
      age,
      furColor,
      phone,
      city,
      area,
      description,
      isPublish,
      userId,
    } as Pet
  }
}

export async function generateCreatePets(length: number, userId: string) {
  const getRandomCat = createRandomCatGenerator(userId)
  const getRandomDog = createRandomDogGenerator(userId)
  const pets = [] as Pet[]
  for (let i = 0; i < length; i++) {
    const pet =
      Math.random() < 0.5 ? await getRandomCat() : await getRandomDog()
    pets.push(pet)
  }

  await prismadb.pet.createMany({ data: pets })
}
