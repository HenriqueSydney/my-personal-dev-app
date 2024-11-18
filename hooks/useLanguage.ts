import { useContext } from 'react'

import { I18nContext } from '@/context/I18nContext'

export function useLanguage() {
  return useContext(I18nContext)
}
