import { LOCAL_STORAGE_KEY } from "../enum/localStorage"

type TLocalStorage = {
  key: LOCAL_STORAGE_KEY
  data: number | string
}

export const storeData = ({ key, data }: TLocalStorage) => {
  window.localStorage.setItem(key, `${data}`)
}

export const getData = (key: TLocalStorage['key']): string | number | null => {
  const data = window.localStorage.getItem(key)
  if (!Number.isNaN(data)) return +data!
  return data
}