'use client'

import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { languages, fallbackLng } from './settings'

const basePath = '/crazy-garage-website'

i18next
  .use(initReactI18next)
  .use(resourcesToBackend((language: string, namespace: string) => {
    return import(`./locales/${language}/${namespace}.json`)
  }))
  .init({
    fallbackLng,
    supportedLngs: languages,
    lng: undefined, // Let detect from URL
    defaultNS: 'common',
    fallbackNS: 'common',
    ns: ['common'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path'],
      lookupFromPathIndex: 1, // Skip basePath
    },
  })

export default i18next
