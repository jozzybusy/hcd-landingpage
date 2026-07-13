import { useI18n } from './I18nProvider.jsx'
import { interpolate } from './dictionaries/index.js'

export function useTranslation() {
  const { locale, setLocale, t } = useI18n()
  return { locale, setLocale, t, interpolate }
}

export { useI18n, interpolate }
