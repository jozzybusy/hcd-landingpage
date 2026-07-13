import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, getDictionary } from './dictionaries/index.js'

const I18nContext = createContext(null)

function getStoredLocale() {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  const stored = window.localStorage.getItem('hcd-locale')
  return SUPPORTED_LOCALES.includes(stored) ? stored : DEFAULT_LOCALE
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => getStoredLocale())

  const setLocale = useCallback((next) => {
    if (SUPPORTED_LOCALES.includes(next)) {
      setLocaleState(next)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('hcd-locale', locale)
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    const dict = getDictionary(locale)
    document.title = dict.meta.title
  }, [locale])

  const t = useMemo(() => getDictionary(locale), [locale])

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within <I18nProvider>')
  }
  return ctx
}

export { I18nContext }
