"use client"

import Image from "next/image";
import React from "react";
import { FaDiscord, FaGithub, FaTelegramPlane } from "react-icons/fa";
import logo from '@/app/icon.png'
import { FaXTwitter } from "react-icons/fa6";
import { useT } from "@/app/i18n/client";
import Link from "next/link";

interface FooterProps {
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}


const defaultSocialLinks = [
  { icon: <FaDiscord className="size-5" />, href: "https://discord.com/invite/uTUXr43", label: "Discord" },
  { icon: <FaTelegramPlane className="size-5" />, href: "https://t.me/runebase_runes", label: "Telegram" },
  { icon: <FaXTwitter className="size-5" />, href: "https://x.com/Runebase_Tweet", label: "Twitter" },
  { icon: <FaGithub className="size-5" />, href: "https://github.com/runebase", label: "Github" },
];

const Footer = ({
  socialLinks = defaultSocialLinks,
}: FooterProps) => {
  const { t } = useT('footer')
  const copyright = `© 2018 - ${new Date().getFullYear()} Runebase, ${t('copyright')}.`
  const sections = [
    {
      title: t('ecosystem'),
      links: [
        { name: "Bots", href: "https://bots.runebase.io" },
        { name: "Documentation", href: "/docs" },
        { name: "Whitepaper", href: "https://downloads.runebase.io/paper.pdf" },
        { name: "RuneX", href: "https://runesx.com" },
      ],
    },
    {
      title: t('community'),
      links: [
        { name: "Discord", href: "https://discord.com/invite/uTUXr43" },
        { name: "Telegram", href: "https://t.me/runebase_runes" },
        { name: "Twitter", href: "https://x.com/Runebase_Tweet" },
        { name: "Github", href: "https://github.com/runebase" },
      ],
    },
  ];

  return (

    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
      <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
        {/* Left Section */}
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image src={logo} alt="Runebase Logo" title="Runebase Logo" className="h-8 w-8" />
            </Link>
            <h2 className="text-xl font-semibold">Runebase</h2>
          </div>

          {/* Description */}
          <p className="text-muted-foreground max-w-sm text-sm">
            {t('description')}
          </p>

          {/* Social Links */}
          <ul className="flex flex-wrap items-center gap-4">
            {socialLinks.map((social, socialIdx) => (
              <li key={socialIdx} className="hover:text-primary font-medium">
                <Link href={social.href} aria-label={social.label}>
                  {social.icon}
                </Link>
              </li>
            ))}
          </ul>

        </div>

        {/* Right Section: Link Sections */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 w-full max-w-4xl">
          {sections.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="mb-4 font-bold">{section.title}</h3>
              <ul className="text-muted-foreground space-y-3 text-sm">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx} className="hover:text-primary font-medium">
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t pt-6 text-xs text-muted-foreground flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <p>{copyright}</p>
        {/* Optional legal links could go here */}
      </div>
    </section>
  );
};

export { Footer };

