import { getAllCommunities } from "@/lib/communities";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "College Sports Co | Campus Content & Gear",
  description:
    "College sports media, athlete stories, and officially licensed gear for every school.",
};

export default function Home() {
  const communities = getAllCommunities();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#080C14]/90 border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
              <span className="text-[#080C14] font-extrabold text-[11px]">CS</span>
            </div>
            <span className="text-sm font-semibold tracking-tight">College Sports Co</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1020] via-[#080C14] to-[#080C14]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/25 mb-5">
            Campus Media Network
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.15]">
            Every school has
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
              a story to tell
            </span>
          </h1>
          <p className="mt-5 text-base text-white/35 max-w-md mx-auto leading-relaxed">
            Athlete-driven content, campus culture, and officially licensed gear &mdash; powered by the communities that know their schools best.
          </p>
        </div>
      </section>

      {/* Community cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 -mt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {communities.map((c) => {
            const featuredVideo = c.videos[0];

            return (
              <a
                key={c.slug}
                href={`/${c.slug}`}
                className="group rounded-2xl border border-white/[0.04] overflow-hidden hover:border-white/[0.12] transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30"
                style={{ backgroundColor: `${c.colors.dark}cc` }}
              >
                {/* Video thumbnail preview */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={`https://i.ytimg.com/vi/${featuredVideo.id}/hqdefault.jpg`}
                    alt={c.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Play hint */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg">
                      <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* School badge */}
                  <div className="absolute top-3 left-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[11px] text-white shadow-lg"
                      style={{ backgroundColor: c.colors.accent }}
                    >
                      {c.shortName.slice(0, 2).toUpperCase()}
                    </div>
                  </div>

                  {/* Video count */}
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/60 text-[11px] text-white/70 font-medium">
                    {c.videos.length} videos
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="text-base font-bold mb-1 group-hover:text-white transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-xs text-white/30 mb-3">{c.tagline}</p>
                  <p className="text-sm text-white/45 leading-relaxed line-clamp-2">
                    {c.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-white/20">
                      {c.products.length} products &middot; {c.storeName}
                    </span>
                    <span className="text-xs font-medium text-white/40 group-hover:text-white/70 transition-colors flex items-center gap-1">
                      Explore
                      <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/20">
          <p>&copy; {new Date().getFullYear()} College Sports Co</p>
          <p>
            Checkout by{" "}
            <a href="https://rye.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/40 transition-colors">
              Rye
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
