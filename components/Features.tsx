"use client"

import { cn } from "@/lib/utils";
import React from "react";
import { useT } from '@/app/i18n/client';
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

import { BoxesIcon, CodeXmlIcon, HandCoinsIcon, LeafIcon, MessagesSquareIcon } from "lucide-react";

import type { FC } from "react";

export const Features: FC = () => {
  const { t } = useT('features')
  const items = [
    {
      title: t('decentralized.text'),
      description: t('decentralized.description'),
      header: <Skeleton />,
      className: "md:col-span-2",
      icon: <BoxesIcon className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: t('smartContracts.text'),
      description: t('smartContracts.description'),
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <CodeXmlIcon className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: t('stakingRewards.text'),
      description: t('stakingRewards.description'),
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <HandCoinsIcon className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: t('carbonNeutral.text'),
      description: t('carbonNeutral.description'),
      header: <Skeleton />,
      className: "md:col-span-2",
      icon: <LeafIcon className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: t('community.text'),
      description: t('community.description'),
      header: <Skeleton />,
      className: "md:col-span-3",
      icon: <MessagesSquareIcon className="h-4 w-4 text-neutral-500" />,
    },
  ];
  return (
    <BentoGrid className={cn("max-w-7xl mx-auto md:auto-rows-[20rem]")}>
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);




