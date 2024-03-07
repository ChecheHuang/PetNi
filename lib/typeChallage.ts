//todo 物件
//實現ValueOf
type ValueOf<Object> = Object[keyof Object]
type valueOf = ValueOf<{ name: string; age: 20 }>
//todo 元組
//Append<Tuple,Element>
type Append<Tuple extends unknown[], Element> = [...Tuple, Element]
type append = Append<[1, string], true>
//返回長度+1
type LengthPlusOne<Tuple extends unknown[]> = [unknown, ...Tuple]['length']
type lengthPlusOne = LengthPlusOne<[1, 1, 1]>
//將元組轉換為陣列
type ToArray<Tuple extends unknown[]> = Array<Tuple[number]>
type toArray = ToArray<[1, 2, 3]>

//todo 判斷
//判斷輸入是否為陣列
type IsArray<T> = T extends unknown[] ? true : false
type array = IsArray<[1, 2, 3]>
type notArray = IsArray<true>

//GetProp<Object,Key>,看Key在Object裡，不在則回傳undefined
type GetProp<Object, Key> = Key extends keyof Object ? Object[Key] : undefined
type getProp = GetProp<{ name: 'name' }, 'name'>
type getUndefined = GetProp<{ name: 'name' }, 'address'>
//todo解構賦值
type User = { fullName: string; age: number }
const user: User = {
  fullName: 'fullName',
  age: 20,
}
const { fullName, age } = user
type GetAge<User> = User extends { age: infer Age } ? Age : undefined
type age = GetAge<User>

type GetFirst<T> = T extends [infer First, ...any] ? First : undefined
type GetRest<T> = T extends [infer First, ...infer Rest] ? Rest : undefined
type GetParams<F> = F extends (...params: infer P) => any ? P : undefined

//todo 遞歸
//概念
type Loop<List> = List extends [infer First, ...infer Rest]
  ? Loop<Rest>
  : undefined
//實現map
type Mapp<List> = List extends [infer First, ...infer Rest]
  ? [number: First, ...Mapp<Rest>]
  : []
type mapp = Mapp<[1, 2, 3]>
//實現filter
type FilterNumber<List> = List extends [infer First, ...infer Rest]
  ? First extends number
    ? [First, ...FilterNumber<Rest>]
    : FilterNumber<Rest>
  : []
type filterNumber = FilterNumber<[1, 2, '3']>
//Take<Tuple,N,Output>
type Take<Tuple, N, Output extends any[] = []> = Tuple extends [
  infer First,
  ...infer Rest,
]
  ? Output['length'] extends N
    ? Output
    : Take<Rest, N, [...Output, First]>
  : Output
type take = Take<[1, 2, 3, 4, 5], 3>

type A = {
  a: string
}
type B = {
  b: string
}
type C = {
  c: string
  b: number
}
