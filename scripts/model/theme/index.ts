import { Theme } from '@prisma/client'

import prismadb from '@/lib/prismadb'

export const seedTheme = async () => {
  const categoryObj = {
    貓: [
      {
        furColor: '橘',
        description: '個性膽小、貪吃、愛講話，十隻橘貓九隻胖，另一隻...超胖。',
      },
      {
        furColor: '三花',
        description: '個性黏人、愛撒嬌，因為遺傳基因的關係，99%以上都是母貓。',
      },
      {
        furColor: '白',
        description:
          '優雅乖巧、個性獨立。撒嬌時，會輕聲喵喵叫，或是輕拍主人討摸摸。 ',
      },
      {
        furColor: '黑',
        description:
          '反差萌、愛撒嬌、聰明、貼心、學習力強、會認人，對牠好，牠會記在心裡。 ',
      },
      {
        furColor: '乳牛',
        description: '貓界的哈士奇、個性好動，容易跟其他貓打成一片。',
      },
      {
        furColor: '虎斑',
        description:
          '野性美、狩獵高手、傲嬌脾氣、警戒心強，一旦被牠認定，就會很依賴主子。',
      },
      {
        furColor: '玳瑁',
        description:
          '個性善良、脾氣最好、愛撒嬌、不挑食，99%以上都是母貓，親人也親貓。 ',
      },
    ],
    犬: [
      {
        furColor: '三色',
        description: '個性老實、喜歡社交，溫順黏人的小跟屁蟲。',
      },
      {
        furColor: '紅棕',
        description: '個性獨立、外向、喜歡與人互動。',
      },
      {
        furColor: '黃',
        description: '溫和友善、忠誠護主、乖巧聽話、不太主動攻擊人。 ',
      },
      {
        furColor: '白',
        description: '憂雅氣質、乖巧安靜。白毛容易髒，需要花心思照顧。  ',
      },
      {
        furColor: '黑',
        description: '個性穩重、敏捷聰明、學習力強。 ',
      },
      {
        furColor: '雙色',
        description: '活潑好動、憨厚、愛玩、天生少根筋、無厘頭，親人也親狗。',
      },
      {
        furColor: '虎斑',
        description: '身上有著老虎斑點，面惡心善、忠心勇敢、聰明機警。',
      },
      {
        furColor: '灰',
        description: '善良優雅、好奇心重、喜歡嘗試新鮮事物、樂於取悅主人。',
      },
    ],
  }

  const themes = Object.entries(categoryObj).reduce(
    (acc, [category, pets]) => {
      for (const { furColor, description } of pets) {
        acc.push({
          category,
          furColor,
          imgUrl: `/images/theme/${furColor}${category}.png`,
          description,
        })
      }
      return acc
    },
    [] as Omit<Theme, 'id'>[],
  )

  for (const theme of themes) {
    await prismadb.theme.create({
      data: theme,
    })
  }
}
