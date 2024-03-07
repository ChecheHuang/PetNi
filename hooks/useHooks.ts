import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { DependencyList, EffectCallback, useEffect, useState } from 'react'
import { useRef } from 'react'

export function usePrev<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export function useIsFirstRender(): boolean {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false

    return true
  }

  return isFirst.current
}
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirst = useIsFirstRender()

  useEffect(() => {
    if (!isFirst) {
      return effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export function useQueryString() {
  const url = usePathname()
  const router = useRouter()
  const searchParams = Object.fromEntries(useSearchParams().entries())
  const createNavigateUrl = (query: Record<string, string>) => {
    return qs.stringifyUrl(
      {
        url,
        query,
      },
      { skipNull: true, skipEmptyString: true },
    )
  }
  const setSearchParams = (NewSearchParams: Record<string, string>) => {
    const navigateUrl = createNavigateUrl({
      ...searchParams,
      ...NewSearchParams,
    })
    router.push(navigateUrl)
  }

  const reset = () => {
    const navigateUrl = createNavigateUrl({})
    router.push(navigateUrl)
  }

  return { setSearchParams, reset, searchParams }
}
