'use client'

import { SessionProvider } from 'next-auth/react'
import React, { useMemo, useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createTRPCProxyClient,
  createWSClient,
  httpLink,
  httpBatchLink,
  loggerLink,
  wsLink,
  splitLink,
  CreateTRPCClientOptions,
} from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { inferRouterOutputs, inferRouterInputs } from '@trpc/server'

import { absoluteUrl } from '@/lib/utils'
import { type AppRouter } from '@/server'

export type TrpcOutputs = inferRouterOutputs<AppRouter>
export type TrpcInputs = inferRouterInputs<AppRouter>

const trpcSetting: CreateTRPCClientOptions<AppRouter> = {
  links: [
    httpBatchLink({
      url: absoluteUrl('/api/trpc'),
    }),
  ],
}
export const trpcClient = createTRPCProxyClient<AppRouter>(trpcSetting)
export const trpcQuery = createTRPCReact<AppRouter>()
export default function TrpcProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            retry: false,
          },
          mutations: {},
        },
      }),
    [],
  )
  const client = useMemo(() => trpcQuery.createClient(trpcSetting), [])
  return (
    <trpcQuery.Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </trpcQuery.Provider>
  )
}
