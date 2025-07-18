import { Inter } from 'next/font/google';
import './globals.css';
import { dir } from 'i18next';
import LayoutClient from '@/components/LayoutClient';
import { languages } from '../i18n/settings';
import { getT } from '../i18n';
import type { Metadata } from 'next';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lng?: string }>;
};

const font = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata({ params }: { params: Promise<{ lng?: string }> }): Promise<Metadata> {
  const { lng } = await params;
  if (!lng) throw new Error('Language parameter is missing');

  const { t } = await getT(lng);
  const keywords: string[] = ['Runebase', 'Blockchain', 'EVM', 'Layer-1', 'Proof-of-Stake', 'Memecoin'];

  // Map language to Open Graph locale
  const localeMap: { [key: string]: string } = {
    en: 'en_US',
    de: 'de_DE',
    fr: 'fr_FR',
  };
  const ogLocale = localeMap[lng] || 'en_US';

  return {
    title: `Runebase | ${t('title')}`,
    description: t('description'),
    keywords: keywords,
    openGraph: {
      title: `Runebase | ${t('title')}`,
      description: t('description'),
      url: `https://runebase.io/${lng}`, // Language-specific URL
      siteName: 'Runebase',
      images: [
        {
          url: 'https://runebase.io/twitter-image.png', // Absolute URL
          width: 1200,
          height: 660,
          alt: 'Runebase Open Graph Image',
        },
      ],
      locale: ogLocale,
      type: 'website',
    },
    twitter: {
      title: `Runebase | ${t('title')}`,
      description: t('description'),
      images: ['https://runebase.io/twitter-image.png'], // Absolute URL
      card: 'summary_large_image',
      creator: '@mael_bomane',
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lng } = await params;
  if (!lng) throw new Error('Language parameter is missing');

  return (
    <html lang={lng} dir={dir(lng)} className={font.className} suppressHydrationWarning>
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}