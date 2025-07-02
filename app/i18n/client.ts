'use client'

import i18next from './i18next'
import { useParams, useRouter, usePathname } from 'next/navigation'
import { useEffect, useState, useCallback, useMemo } from 'react'
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
  currentLanguage: string
  changeLanguage: (lang: string) => Promise<void>
} {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()

  const lng = typeof params?.lng === 'string' ? params.lng : undefined
  if (!lng) throw new Error('useT is only available inside /app/[lng]')

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

  const { t, i18n, ready } = useTranslation(ns, options)

  const currentLanguage = useMemo(() => i18n.language, [i18n.language])

  const changeLanguage = useCallback(
    async (lang: string) => {
      const oldLang = i18n.language
      await i18n.changeLanguage(lang)

      if (!pathname) return

      // Replace the locale in the pathname
      const updatedPath = pathname.startsWith(`/${oldLang}/`)
        ? pathname.replace(`/${oldLang}/`, `/${lang}/`)
        : pathname.replace(`/${oldLang}`, `/${lang}`)

      router.push(updatedPath)
    },
    [i18n, router, pathname]
  )

  return {
    t,
    i18n,
    ready,
    currentLanguage,
    changeLanguage,
  }
}
