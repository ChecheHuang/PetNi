import { ZodError } from 'zod'

import { TRPCError, initTRPC } from '@trpc/server'

import { getUserAuth } from '@/app/api/auth/[...nextauth]/authOptions'

const t = initTRPC.create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})
const middleware = t.middleware
const isAuth = middleware(async (opts) => {
  const session = await getUserAuth()
  if (!session || !session.user.id) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return opts.next({
    ctx: {
      userId: session.user.id,
    },
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuth)
