import { Community } from "@/lib/communities";

interface Props {
  community: Community;
}

export default function Hero({ community }: Props) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${community.colors.primary} 0%, ${community.colors.dark} 60%, ${community.colors.darker} 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at top, ${community.colors.accent}40, transparent 70%)`,
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36 text-center">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-6">
          {community.tagline}
        </p>
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.1]">
          {community.name.split(" ").map((word, i, arr) =>
            i === arr.length - 1 ? (
              <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                {word}
              </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </h1>
        <p className="mt-6 text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
          {community.description}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#videos"
            className="group px-7 py-3 rounded-full bg-white text-black font-semibold text-sm hover:shadow-lg hover:shadow-white/10 transition-all hover:-translate-y-0.5"
          >
            Watch Latest
            <span className="inline-block ml-1 transition-transform group-hover:translate-x-0.5">&rarr;</span>
          </a>
          <a
            href="#shop"
            className="px-7 py-3 rounded-full border border-white/15 text-white font-semibold text-sm hover:bg-white/[0.06] hover:border-white/25 transition-all"
          >
            Shop Gear
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </section>
  );
}
