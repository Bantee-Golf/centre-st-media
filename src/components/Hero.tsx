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
          background: `radial-gradient(ellipse at top, ${community.colors.accent}20, transparent 60%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/25 mb-1.5">
            {community.tagline}
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {community.name}
          </h1>
          <p className="mt-1.5 text-sm text-white/35 max-w-md leading-relaxed">
            {community.description}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`https://www.youtube.com/${community.youtubeHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors"
          >
            Subscribe
          </a>
          <a
            href={community.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-white/15 text-white text-xs font-semibold hover:bg-white/[0.06] transition-colors"
          >
            {community.storeName}
          </a>
        </div>
      </div>
    </section>
  );
}
