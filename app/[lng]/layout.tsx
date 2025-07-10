import { Inter } from "next/font/google";
import "./globals.css";
import { dir } from "i18next";
import LayoutClient from "@/components/LayoutClient";
import { languages } from "../i18n/settings";
import { getT } from "../i18n";
import type { Metadata } from "next";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lng?: string }>;
};

const font = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata({ params }: { params: Promise<{ lng?: string }> }): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await getT(lng);
  const keywords: string[] = ['Runebase', 'Blockchain', 'EVM', 'Layer-1', 'Proof-of-Stake', 'Memecoin']
  return {
    title: `Runebase | ${t('title')}`,
    description: t("description"),
    keywords: keywords,
    openGraph: {
      title: `Runebase | ${t('title')}`,
      description: t("description"),
      url: `https://runebase.io/`,
      siteName: 'Runebase',
      // If you add an opengraph-image.(jpg|jpeg|png|gif) image to the /app folder, you don't need the code below
      // images: [
      //   {
      //     url: `https://${config.domainName}/share.png`,
      //     width: 1200,
      //     height: 660,
      //   },
      // ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      title: `Runebase | ${t('title')}`,
      description: t("description"),
      // If you add an twitter-image.(jpg|jpeg|png|gif) image to the /app folder, you don't need the code below
      // images: [openGraph?.image || defaults.og.image],
      card: "summary_large_image",
      creator: "@mael_bomane",
    },

  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lng } = await params;
  return (
    <html lang={lng} dir={dir(lng)} className={font.className} suppressHydrationWarning>
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
