
'use client'

import i18next from './i18next'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation, UseTranslationOptions } from 'react-i18next'
import type { TFunction, Namespace } from 'i18next'

const runsOnServerSide = typeof window === 'undefined'

export function useT(
  ns?: Namespace,
  options?: UseTranslationOptions<string>
): {
  t: TFunction
  i18n: typeof i18next
  ready: boolean
} {
  const params = useParams()
  const lng = typeof params?.lng === 'string' ? params.lng : undefined

  if (!lng) {
    throw new Error('useT is only available inside /app/[lng]')
  }

  if (runsOnServerSide && i18next.resolvedLanguage !== lng) {
    i18next.changeLanguage(lng)
  } else {
    const [activeLng, setActiveLng] = useState(i18next.resolvedLanguage)

    useEffect(() => {
      if (activeLng === i18next.resolvedLanguage) return
      setActiveLng(i18next.resolvedLanguage)
    }, [activeLng])

    useEffect(() => {
      if (i18next.resolvedLanguage !== lng) {
        i18next.changeLanguage(lng)
      }
    }, [lng])
  }

  return useTranslation(ns, options)
}

