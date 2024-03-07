import { PrismaClient } from '@prisma/client'

import { defaultPets, generateCreatePets } from '../pet'

const prismadb = new PrismaClient()
const user = {
  id: 'clp48hll300005863g9fm6pfo',
  name: '黃聖崴',
  email: 'qwerfcxzas1@gmail.com',
  emailVerified: null,
  username: 'XnFxN9CXOo',
  image:
    'https://lh3.googleusercontent.com/a/ACg8ocJy26xpw6nMTGuU1lScvM2XXTKHfeEf98UWVxEh6V2dVfE=s96-c',
  pets: { create: defaultPets },
  accounts: {
    create: {
      type: 'oauth',
      provider: 'google',
      providerAccountId: '103968925181273026065',
      refresh_token:
        '1//0e10UeuM05281CgYIARAAGA4SNwF-L9Irp_m0Z0W5dcHCBfqgf0ccKXmPEYHv7eZvSQJ3tP01Z4BJgGwLhZREj5eSG_HaXB9FgVE',
      access_token:
        'ya29.a0AfB_byDztbE5apACvVpvKUkVCDuRS9KBqKmLGDXJfOWLYNivTKgj3_R8rkZahB7hnXRMQ8qdpTrKM59rNuZsZPWluWwrRAxKZTDVzHCuydycVrr5JW-dpkP5kOzjTL8SlSiLqhyhFjHcqV8sKGNNYEQNshrZaelXdTb2aCgYKAYUSARESFQHGX2Mi3NKcsx7HUjX0LDSwvqbQ7Q0171',
      expires_at: 1700369381,
      token_type: 'Bearer',
      scope:
        'https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email',
      id_token:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjViMzcwNjk2MGUzZTYwMDI0YTI2NTVlNzhjZmE2M2Y4N2M5N2QzMDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4NzI5MjEwMzM1ODItdDdnMDQ3bmxvaTNsMjdzOGlpcHEzN2NzZW51OThqOWQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4NzI5MjEwMzM1ODItdDdnMDQ3bmxvaTNsMjdzOGlpcHEzN2NzZW51OThqOWQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDM5Njg5MjUxODEyNzMwMjYwNjUiLCJlbWFpbCI6InF3ZXJmY3h6YXMxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiNmREWjUzVTB6RGFZTjl5WVRIYlotQSIsIm5hbWUiOiLpu4PogZbltLQiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSnkyNnhwdzZuTVRHdVUxbFNjdk0yWFhUS0hmZUVmOThVV1Z4RWg2VjJkVmZFPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IuiBluW0tCIsImZhbWlseV9uYW1lIjoi6buDIiwibG9jYWxlIjoiemgtVFciLCJpYXQiOjE3MDAzNjU3ODIsImV4cCI6MTcwMDM2OTM4Mn0.1S4zv8rS8NZ0b7cMCVKHgjzbeQam2c1eUUsrN8S-bAXBpaoUSpaZBXtOIgDuj5tGNR_WAaBsAVktC9CJCUJA3DWu7Cum4HIUW6upZh5u5tq8eSnrnAYrKwehuZfdh6Un-eLcJQqw7F8vJw_twNH_jryrQLCFYbSySzd51UcU3x2-QK74PYiAgcs0ggm2c6nSu8mAy9K46huxgaW49MKYdXdh09u735dwbu19-a3Q4A_uiAEtDO4pVJfdvRUrdDSccFDnM64ihuA3MHQz1DMSI3fTcrwf-kgevlPF0hDLufhMNB8mhEQ5L5yma6OP55R0Yf2C8irdjAPlUkI7N8gnHw',
      session_state: null,
    },
  },
}

export const seedUser = async () => {
  const testUser = {
    id: 'test',
    name: 'name',
    email: 'email',
    pets: await generateCreatePets(20),
  }
  const users = [testUser]
  for (const user of users) {
    await prismadb.user.create({
      data: user,
    })
  }
}
