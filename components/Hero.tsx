// components/ui/Hero.tsx
"use client"

import { useRouter } from "next/navigation";
import { FaApple, FaGooglePlay, FaWindows, FaLinux } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useT } from '@/app/i18n/client';
import { GameOfLifeGrid } from "@/components/magicui/flickering-grid";
import { Button } from "@/components/ui/button";

import type { FC } from "react";

const Hero: FC = () => {
  const router = useRouter();
  const { t } = useT('hero');

  const downloadLinks = [
    { icon: <FaWindows className="size-5" />, href: "https://github.com/Runebase/runebase/releases/latest", label: "Windows" },
    { icon: <FaApple className="size-5" />, href: "https://github.com/Runebase/runebase/releases/latest", label: "OSX" },
    { icon: <FaLinux className="size-5" />, href: "https://github.com/Runebase/runebase/releases/latest", label: "Linux" },
    {
      icon: <FaGooglePlay className="size-5" />,
      href: "https://play.google.com/store/apps/details?id=io.runebase.runebaselitewallet",
      label: "Google Play"
    },
  ];

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-xl max-w-7xl w-full mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center px-8 py-8 lg:py-24",
        // light styles
        "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      {/* Background grid */}
      <GameOfLifeGrid
        className="absolute inset-0 z-0 w-[200%] h-[200%] p-[0.5]"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
      />

      {/* Foreground content */}
      <div className="w-full flex flex-col gap-10 lg:gap-14 lg:py-24 items-center justify-center text-center z-2">
        <h1 className="w-full bg-base-100 opacity-100 tracking-widest font-extrabold text-center text-primary text-5xl leading-tight">
          Runebase
        </h1>
        <p className="w-full bg-base-100 opacity-100 text-center text-2xl rounded-md leading-relaxed">
          {t('description')}
        </p>

        {/* Download Buttons */}
        <div className="grid lg:grid-rows-1 lg:grid-flow-col gap-4">

          {downloadLinks.map((wallet, idx) => (
            <Button
              variant='default'
              className="flex justify-center items-center p-4"
              onClick={() => router.push(wallet.href)}
              key={idx}
            >
              {wallet.icon}
              <div className="flex flex-col space-y-0">
                <span className="text-[8px]">{t('downloadOn')}</span> <span className="font-bold">{wallet.label}</span>
              </div>
            </Button>
          ))}

        </div>
      </div>
    </section>);
};

export default Hero

