/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocales } from 'expo-localization'
import { createContext, ReactNode, useEffect, useState } from 'react'

import enUsLocaleString from '@/app/languages/en-US.json'
import { Translations } from '@/app/languages/languageInterface'

interface I18nContextType {
  localizedStrings: Translations
}

export const I18nContext = createContext({} as I18nContextType)

interface I18nContextProviderProps {
  children: ReactNode
}

export function I18nContextProvider({ children }: I18nContextProviderProps) {
  const locale = useLocales()
  const [localizedStrings, setLocalizedStrings] =
    useState<Translations>(enUsLocaleString)

  async function loadLanguage() {
    let strings: Translations = enUsLocaleString
    try {
      if (locale[0]?.languageTag === 'pt-BR') {
        strings = await import('@/app/languages/pt-BR.json')
      }

      setLocalizedStrings(strings)
    } catch (error) {
      console.error('Erro ao carregar strings de localização:', error)
      setLocalizedStrings(strings)
    }
  }

  useEffect(() => {
    loadLanguage()
  }, [locale])
  return (
    <I18nContext.Provider value={{ localizedStrings }}>
      {children}
    </I18nContext.Provider>
  )
}
