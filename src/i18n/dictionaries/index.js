import zh from './zh.jsx'
import en from './en.jsx'

const dictionaries = { zh, en }

export const DEFAULT_LOCALE = 'zh'
export const SUPPORTED_LOCALES = ['zh', 'en']

export function getDictionary(locale) {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE]
}

export function interpolate(template, vars = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`)
}
