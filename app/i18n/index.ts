import i18next from './i18next';
import { languages } from './settings'; // Keep languages import
import type { TFunction, Namespace } from 'i18next';

interface GetTOptions {
  keyPrefix?: string;
}

export async function getT(
  lng: string,
  ns?: Namespace,
  options?: GetTOptions
): Promise<{
  t: TFunction;
  i18n: typeof i18next;
}> {
  if (!lng || !languages.includes(lng)) {
    throw new Error(`Invalid or missing language: ${lng}`);
  }

  if (lng !== i18next.resolvedLanguage) {
    await i18next.changeLanguage(lng);
  }

  if (ns && !i18next.hasLoadedNamespace(ns)) {
    await i18next.loadNamespaces(ns);
  }

  const t = i18next.getFixedT(lng, ns, options?.keyPrefix);

  return {
    t,
    i18n: i18next,
  };
}