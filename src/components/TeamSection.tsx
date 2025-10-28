"use client";

import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { getTeamMembers, urlFor, type TeamMember } from "@/lib/sanity";
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

// Fallback data type
type FallbackTeamMember = { name: string; role: string; image: string; };

// Fallback data
const FALLBACK_TEAM: FallbackTeamMember[] = [
  { name: "Andrea Dubuis", role: "Owner", image: "/Andrea-Retrato-Le-Chandelier.webp" },
  { name: "Federico Sanchez", role: "Manager", image: "/Fede-Retrato-Le-Chandelier-3.webp" },
  { name: "Kevin Araya", role: "Captain", image: "/Kevin-Retrato-Le-Chandelier-3.webp" },
  { name: "Luis Offer", role: "Waiter", image: "/Luis-Retrato-Le-Chandelier-3.webp" },
  { name: "Edgar", role: "Waiter", image: "/Edgar-Retrato-Le-Chandelier.webp" },
  { name: "Kenneth", role: "Main Chef", image: "/Kenneth-Retrato-Le-Chandelier-2.webp" },
  { name: "Javier Baca", role: "Chef", image: "/Javi-Retrato-Le-Chandelier.webp" },
  { name: "Lenner", role: "Sub-Chef", image: "/Lenner-Retrato-Le-Chandelier-3.webp" },
];

export default function TeamSection() {
  const t = useTranslations('team');
  const [team, setTeam] = useState<(TeamMember | FallbackTeamMember)[]>(FALLBACK_TEAM);

  useEffect(() => {
    getTeamMembers().then(teamMembers => {
      if (teamMembers.length > 0) {
        setTeam(teamMembers);
      }
    });
  }, []);

  return (
    <section className="section" id="team">
      <div className="container">
        <SectionHeading title={t('title')} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {team.map((m) => {
            // Check if this is Sanity data (has _id) or fallback data (string image path)
            const imageUrl = '_id' in m && m.image
              ? urlFor(m.image).width(600).height(450).url()
              : (m as FallbackTeamMember).image;
            
            return (
              <article key={m.name} className="rounded-xl overflow-hidden border border-black/10 bg-white/10">
                <div className="relative aspect-[4/3]">
                  <Image src={imageUrl} alt={m.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{m.name}</h3>
                  <p className="text-sm text-white/60">{m.role}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}