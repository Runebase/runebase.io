import { Inter } from "next/font/google";
import "./globals.css";
import LayoutClient from "@/components/LayoutClient";
import type { Metadata } from "next";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Runsebase",
  description: "Smart-Contract Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      //data-theme={config.colors.theme}
      className={font.className}
      suppressHydrationWarning
    >
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>

  );
}
