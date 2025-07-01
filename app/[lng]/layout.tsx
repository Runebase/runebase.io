import { Inter } from "next/font/google";
import "./globals.css";
import { dir } from "i18next";
import LayoutClient from "@/components/LayoutClient";
import { languages } from "../i18n/settings";
import { getT } from "../i18n";

const font = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata({ params }: { params: { lng: string } }) {
  const { lng } = await params;
  const { t } = await getT(lng);
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>) {
  const { lng } = await params;
  return (
    <html lang={lng} dir={dir(lng)} className={font.className} suppressHydrationWarning>
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>

  );
}
