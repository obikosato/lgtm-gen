import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import type { Language } from '../i18n/messages'
import { messages } from '../i18n/messages'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof messages.ja) => string
}

const getInitialLanguage = (): Language => {
  const urlParams = new URLSearchParams(window.location.search)
  const langParam = urlParams.get('lang')
  if (langParam === 'ja' || langParam === 'en') {
    return langParam
  }

  const browserLang =
    navigator.language || (navigator as { userLanguage?: string }).userLanguage
  return browserLang?.startsWith('ja') ? 'ja' : 'en'
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)

    document.documentElement.lang = lang
    const url = new URL(window.location.href)
    url.searchParams.set('lang', lang)
    window.history.replaceState({}, '', url.toString())
  }

  const t = (key: keyof typeof messages.ja): string => {
    return messages[language][key]
  }

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return (
    <LanguageContext value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
