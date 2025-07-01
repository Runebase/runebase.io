import i18next from './i18next'
import { headerName } from './settings'
import { headers } from 'next/headers'
import type { TFunction, Namespace } from 'i18next'

interface GetTOptions {
  keyPrefix?: string
}

export async function getT(
  ns?: Namespace,
  options?: GetTOptions
): Promise<{
  t: TFunction
  i18n: typeof i18next
}> {
  const headerList = await headers()
  const lngFromHeader = headerList.get(headerName)
  const lng = lngFromHeader ?? i18next.resolvedLanguage

  if (!lng) {
    throw new Error('No language detected from headers or i18next')
  }

  if (lng !== i18next.resolvedLanguage) {
    await i18next.changeLanguage(lng)
  }

  if (ns && !i18next.hasLoadedNamespace(ns)) {
    await i18next.loadNamespaces(ns)
  }

  const t = i18next.getFixedT(
    lng,
    ns,
    options?.keyPrefix
  )

  return {
    t,
    i18n: i18next,
  }
}


