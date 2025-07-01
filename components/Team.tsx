"use client"

import Link from "next/link";
import { FaLinkedin, FaTelegramPlane } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import jonas_collier from "@/components/assets/images/team/jonas_collier.png";
import jonas_dahlberg from "@/components/assets/images/team/jonas_dahlberg.png";
import mael_bomane from "@/components/assets/images/team/mael_bomane.png";
import ph03nix from "@/components/assets/images/team/ph03nix.png";
import smiley from "@/components/assets/images/team/smiley.png";

import type { FC } from "react"

export const Team: FC = () => {
  const teamMembers = [
    {
      name: 'Jonas Collier',
      role: 'Core Developer',
      socials: [
        { linkedIn: 'jonas-collier-86835b86' },
        { telegram: 'Bagosan' }
      ],
      image: jonas_collier,
    },
    {
      name: 'Jonas Dahlberg',
      role: 'Graphical Design',
      socials: [{ telegram: 'eYm1990' }],
      image: jonas_dahlberg,
    },
    {
      name: 'Mael Bomane',
      role: 'Web Developer',
      socials: [{ telegram: 'mbomane' }],
      image: mael_bomane,
    },
    {
      name: 'Ph03nix',
      role: 'Discord Moderator',
      socials: [],
      image: ph03nix,
    },
    {
      name: 'Smiley',
      role: 'Discord Moderator',
      socials: [],
      image: smiley,
    },
  ];
  return (
    <section className="w-full max-w-7xl grid [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] gap-4 mx-auto">
      {teamMembers.map((member, idx) => {
        return (
          <Card className="w-full" key={idx}>
            <CardHeader>
              <Avatar className="w-[50%] h-auto mx-auto mb-2">
                <AvatarImage src={member.image.src} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardTitle className="w-full text-center">{member.name}</CardTitle>
              <CardDescription className="w-full text-center">{member.role}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center space-x-4">
              {member.socials?.map((social, jdx) => (
                <div key={jdx}>
                  {social.linkedIn ? (
                    <Link href={`https://www.linkedin.com/in/${social.linkedIn}`} target="_blank">
                      <FaLinkedin className="cursor-pointer size-5" />
                    </Link>
                  ) : ''
                  }
                  {social.telegram ? (
                    <Link href={`https://t.me/${social.telegram}`} target="_blank">
                      <FaTelegramPlane className="cursor-pointer size-5" />
                    </Link>
                  ) : ''
                  }
                </div>
              ))}
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}
