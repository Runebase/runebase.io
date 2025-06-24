"use client"

import { cn } from "@/lib/utils";
import React, { FC } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

import { BoxesIcon, CodeXmlIcon, HandCoinsIcon, LeafIcon, MessagesSquareIcon } from "lucide-react";

export const Features: FC = () => {
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

const items = [
  {
    title: "Decentralized",
    description: "Users don’t have to put trust in a central authority. decentralized networks are run by the participants themselves. This means that the entire system becomes more distributed.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <BoxesIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Smart-Contracts",
    description: "A protocol intended to digitally facilitate, verify, or enforce the negotiation or performance of a contract. Smart contracts allow the performance of credible transactions without third parties.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <CodeXmlIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Staking Rewards",
    description: "Staking is the process of holding funds in a cryptocurrency wallet to support the operations of a blockchain network. Users are rewarded simply for holding coins.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <HandCoinsIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Carbon Neutral",
    description: "The transaction confirmations is not done with hardware that requires alot of energy intake, but with already owned coins in the software wallet.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <LeafIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Community",
    description: "Runebase has a positive and encouraging community with tangible impact on individual fulfillment. The community share similar values that cooperate to help accomplish several goals.",
    header: <Skeleton />,
    className: "md:col-span-3",
    icon: <MessagesSquareIcon className="h-4 w-4 text-neutral-500" />,
  },
];


