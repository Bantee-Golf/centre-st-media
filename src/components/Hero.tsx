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
          background: `linear-gradient(180deg, ${community.colors.primary} 0%, ${community.colors.darker} 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at top, ${community.colors.accent}25, transparent 60%)`,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/30 mb-4">
          {community.tagline}
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15]">
          {community.name}
        </h1>
        <p className="mt-4 text-sm sm:text-base text-white/40 max-w-md mx-auto leading-relaxed">
          {community.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#videos"
            className="group px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:shadow-lg hover:shadow-white/10 transition-all hover:-translate-y-0.5"
          >
            Watch
            <span className="inline-block ml-1 transition-transform group-hover:translate-x-0.5">&rarr;</span>
          </a>
          <a
            href="#shop"
            className="px-6 py-2.5 rounded-full border border-white/15 text-white font-semibold text-sm hover:bg-white/[0.06] hover:border-white/25 transition-all"
          >
            Shop
          </a>
        </div>
      </div>
    </section>
  );
}
