'use client'

import { Loader2 } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BsGithub } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'sonner'
import * as z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

function AuthForm() {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/deliver')
      console.log('已登入')
    }
  }, [session?.status, router])

  const socialAction = (action: string) => {
    void signIn(action, { redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error('Invalid credentials!')
      }
      if (callback?.ok) {
        router.push('/deliver')
      }
    })
  }
  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <div>請登入帳號，才能發送養文</div>
        <CredentialForm />
        {/* <Button
          className="h-[46px] w-[236px]"
          onClick={() => socialAction('github')}
        >
          <BsGithub className="mr-2 h-4 w-4" /> GitHub 登入
        </Button> */}
        <Button
          className="h-[46px] w-[236px]"
          onClick={() => socialAction('google')}
        >
          <FcGoogle className="mr-2 h-4 w-4" /> Google 登入
        </Button>
        <Button
          variant="secondary"
          className="h-[46px] w-[236px] font-medium"
          onClick={() => router.back()}
        >
          取消
        </Button>
      </div>
    </>
  )
}

export default AuthForm

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().min(1, { message: 'Email is required' }),
})
const CredentialForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: 'name',
      email: 'email',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)

    signIn('credentials', data)
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!')
        }

        // if (callback?.ok) {
        //   router.push('/deliver')
        // }
      })
      .finally(() => setIsLoading(false))
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[236px] space-y-6  "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>姓名</FormLabel>
              <FormControl>
                <Input placeholder="姓名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>信箱</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isLoading}
          className="h-[46px] w-[236px]"
          type="submit"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          登入
        </Button>
      </form>
    </Form>
  )
}
