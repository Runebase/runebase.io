// components/ui/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes"

import { FaXTwitter } from "react-icons/fa6";
import { LanguagesIcon, MoonIcon, SunIcon } from "lucide-react";
import { FaDiscord, FaGithub, FaTelegramPlane } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { useT } from "@/app/i18n/client";

import logo from "@/app/icon.png";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import en from "@/components/assets/images/us.svg";
import fr from "@/components/assets/images/fr.svg";
import de from "@/components/assets/images/de.svg";

import type { FC } from "react";

const Header: FC = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { t, changeLanguage, currentLanguage } = useT('header');

  // setIsOpen(false) when the route changes (i.e: when the user clicks on a link on mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  const links: {
    href: string;
    label: string;
  }[] = [
      { label: t('bots'), href: "https://bots.runebase.io" },
      { label: t('runesx'), href: "https://runesx.xyz" },
      { label: t('docs'), href: "/docs" },
      //{ label: t('whitepaper'), href: "https://downloads.runebase.io/paper.pdf" },
    ];

  const socialLinks = [
    { icon: <FaDiscord className="size-5" />, href: "https://discord.com/invite/uTUXr43", label: "Discord" },
    { icon: <FaTelegramPlane className="size-5" />, href: "https://t.me/runebase_runes", label: "Telegram" },
    { icon: <FaXTwitter className="size-5" />, href: "https://x.com/Runebase_Tweet", label: "Twitter" },
    { icon: <FaGithub className="size-5" />, href: "https://github.com/runebase", label: "Github" },
  ];

  const { setTheme, theme } = useTheme()

  return (
    <header className={cn(
      "bg-background z-[2] border-b border-solana-green",
      "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
    )}>
      <nav
        className="w-full flex items-center justify-between px-8 py-4 mx-auto"
        aria-label="Global"
      >
        {/* logo/name on large screens */}
        <div className="flex">
          <Link
            className="flex items-center gap-2 shrink-0 "
            href="/"
            title="runebase homepage"
          >
            <Image
              src={logo}
              alt="runebase logo"
              className="rounded-full w-12 h-12"
              priority={true}
              width={50}
              height={50}
              unoptimized
            />
            <span className="ml-2 font-extrabold text-primary text-lg tracking-wide">Runebase</span>
          </Link>

          {/* social links */}
          <ul className="hidden lg:flex text-muted-foreground items-center space-x-6 ml-8">
            {socialLinks.map((social, idx) => (
              <li key={idx} className="hover:text-primary font-medium">
                <Link href={social.href} aria-label={social.label} target="_blank" >
                  {social.icon}
                </Link>
              </li>
            ))}
          </ul>

        </div>

        {/* burger button to open menu on mobile */}

        {/* links on large screens */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:gap-12">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="link link-hover"
              title={link.label}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex ml-auto items-center space-x-4">
          {/* burger menu */}
          <div className="flex lg:hidden">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setIsOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-base-content"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </Button>
          </div>

          {/* language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size='icon' variant='ghost'>
                <LanguagesIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuCheckboxItem
                checked={currentLanguage == 'en'}
                onCheckedChange={() => changeLanguage('en')}
              >
                <Image src={en} alt='English' width={20} /> English
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={currentLanguage == 'de'}
                onCheckedChange={() => changeLanguage('de')}
              >
                <Image src={de} alt='German' width={20} /> German
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={currentLanguage == 'fr'}
                onCheckedChange={() => changeLanguage('fr')}
              >
                <Image src={fr} alt='French' width={20} /> French
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* theme switcher */}
          <Button size='icon' variant='ghost'
            onClick={() => setTheme(`${theme == 'light' ? 'dark' : 'light'}`)}
          >
            {theme == 'light' && <MoonIcon className="size-5" />}
            {theme == 'dark' && <SunIcon className="size-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`relative z-50 ${isOpen ? "h-screen" : "hidden"}`}>
        <div
          className={`fixed inset-y-0 right-0 z-10 w-full px-8 py-4 overflow-y-auto bg-background max-w-screen sm:ring-1 sm:ring-neutral/10 transform origin-right transition ease-in-out duration-300`}
        >
          {/* logo/name on small screens */}
          <div className="flex items-center justify-between">
            <Link
              className="flex items-center gap-2 shrink-0 "
              title="Runebase Homepage"
              href="/"
            >
              <Image
                src={logo}
                alt="Runebase Logo"
                className="rounded-full w-12 h-12"
                priority={true}
                width={32}
                height={32}
                unoptimized
              />
              <span className="font-extrabold text-lg">Runebase</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Your links on small screens */}
          <div className="flow-root mt-6 ">
            <div className="py-4 w-full">
              <div className="flex flex-col gap-y-4 items-start">
                {links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.href}
                    className="link link-hover"
                    title={link.label}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <ul className="flex text-muted-foreground justify-center items-center space-x-6 ml-8">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="hover:text-primary font-medium">
                  <Link href={social.href} aria-label={social.label} target="_blank" >
                    {social.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

