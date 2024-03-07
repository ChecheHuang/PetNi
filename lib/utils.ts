import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function absoluteUrl(path = '') {
  if (typeof window !== 'undefined') return path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`
  return `http://localhost:${process.env.PORT ?? 3000}${path}`
}

export const wait = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })

export const removeUndefinedAndNullAndEmpty = <T extends AnyObject>(obj: T) =>
  filterObjectValueByArg(obj, undefined, null, '')

const filterObjectValueByArg = <T extends AnyObject>(
  obj: T,
  ...arg: unknown[]
) => {
  const newObj = {} as T
  for (const key in obj) {
    const isObj = !!Object.prototype.hasOwnProperty.call(obj, key)
    if (!isObj) throw new Error('not an object')
    const isSkip = arg.reduce((acc, cur) => acc || obj[key] === cur, false)
    if (!isSkip) newObj[key] = obj[key]
  }
  return newObj
}
