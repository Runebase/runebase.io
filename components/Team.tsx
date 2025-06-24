"use client"

import type { FC } from "react"
import { FaLinkedin, FaTelegramPlane } from "react-icons/fa";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";

type TeamMember = {
  name: string;
  socials: [
    {
      linkedIn?: string | null
    },
    {
      telegram?: string | null
    }
  ]
}

export const Team: FC = () => {
  const teamMembers = [
    {
      name: 'Jonas Collier',
      socials: [
        {
          linkedIn: 'jonas-collier-86835b86',
        },
        {
          telegram: 'Bagosan'
        }
      ],
      role: "Core Developer",
    },
    {
      name: 'Jonas Dahlberg',
      socials: [
        {
          telegram: 'eYm1990'
        }
      ],
      role: "Graphical Design"
    },
    {
      name: 'Mael Bomane',
      socials: [
        {
          telegram: 'mbomane'
        }
      ],
      role: "Web Developer"
    },

    {
      name: 'Ph03nix',
      socials: [],
      role: "Discord Moderator"
    },
    {
      name: 'Smiley',
      socials: [],
      role: "Discord Moderator"
    },
  ];

  return (
    <section className="w-full max-w-7xl grid [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] gap-4 mx-auto">
      {teamMembers.map((member, idx) => (
        <Card className="w-full" key={idx}>
          <CardHeader>
            <Avatar className="w-[50%] h-auto mx-auto mb-2">
              <AvatarImage src={`/images/team/${member.name.toLowerCase().replace(/\s+/g, '_')}.png`} />
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
      ))}
    </section>
  )
}
