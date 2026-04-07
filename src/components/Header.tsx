"use client";

import { useState } from "react";
import Image from "next/image";
import { Community } from "@/lib/communities";

const CSCO_LOGO =
  "https://cdn.prod.website-files.com/65a14c5684cdbc76b9557f2a/662c18fa86058d7c17bda67a_TheCSco_Beige_Clean.svg";

interface Props {
  community: Community;
  allCommunities: Community[];
}

export default function Header({ community, allCommunities }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const otherCommunities = allCommunities.filter(
    (c) => c.slug !== community.slug
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/[0.06]" style={{ backgroundColor: `${community.colors.darker}ee` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CSCO_LOGO} alt="College Sports Co" className="h-5 w-auto opacity-40" />
            </a>
            <span className="text-white/15">/</span>
            <a href={`/${community.slug}`} className="flex items-center gap-2.5 group">
            {community.logo ? (
              <div className="w-8 h-8 rounded-lg bg-white/95 flex items-center justify-center p-1 transition-transform group-hover:scale-105">
                <Image src={community.logo} alt={community.shortName} width={24} height={24} className="object-contain" />
              </div>
            ) : (
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-transform group-hover:scale-105"
                style={{ backgroundColor: community.colors.accent, color: "#fff" }}
              >
                {community.shortName.slice(0, 2).toUpperCase()}
              </div>
            )}
            <span className="text-sm font-semibold tracking-tight hidden sm:block">
              {community.name}
            </span>
          </a>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="#videos">Videos</NavLink>
            <NavLink href="#shop">Shop</NavLink>
            {otherCommunities.map((c) => (
              <NavLink
                key={c.slug}
                href={`/${c.slug === "byu" ? "" : c.slug}`}
              >
                {c.shortName}
              </NavLink>
            ))}
            <a
              href={`https://www.youtube.com/${community.youtubeHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-sm px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-medium transition-colors"
            >
              Subscribe
            </a>
          </nav>

          <button
            className="md:hidden p-2 -mr-2 text-white/60 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-1 animate-in slide-in-from-top-2">
            <MobileLink href="#videos" onClick={() => setMobileOpen(false)}>Videos</MobileLink>
            <MobileLink href="#shop" onClick={() => setMobileOpen(false)}>Shop</MobileLink>
            {otherCommunities.map((c) => (
              <MobileLink key={c.slug} href={`/${c.slug === "byu" ? "" : c.slug}`} onClick={() => setMobileOpen(false)}>
                {c.shortName}
              </MobileLink>
            ))}
            <a
              href={`https://www.youtube.com/${community.youtubeHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm text-center px-4 py-2 rounded-full bg-red-600 text-white font-medium"
            >
              Subscribe on YouTube
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-sm text-white/50 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-all">
      {children}
    </a>
  );
}

function MobileLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <a href={href} onClick={onClick} className="text-sm text-white/60 hover:text-white px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
      {children}
    </a>
  );
}
