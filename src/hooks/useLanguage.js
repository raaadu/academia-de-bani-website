import { createContext, useContext, useState, createElement } from 'react'
import { translations } from '../i18n/translations'

export const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLangState] = useState(() => {
    try {
      return localStorage.getItem('adb_language') || 'ro'
    } catch {
      return 'ro'
    }
  })

  const setLanguage = (lang) => {
    setLangState(lang)
    try {
      localStorage.setItem('adb_language', lang)
    } catch {}
  }

  const t = (key, ...args) => {
    const keys = key.split('.')
    let value = translations[language]
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) break
    }
    if (typeof value === 'function') return value(...args)
    return value ?? key
  }

  return createElement(
    LanguageContext.Provider,
    { value: { language, setLanguage, t } },
    children
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

// Pick the right language from a {ro, en} bilingual field
export function L(field, lang) {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[lang] ?? field.ro ?? ''
}
