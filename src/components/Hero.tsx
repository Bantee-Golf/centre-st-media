export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#041E42] via-[#0A2A5C] to-[#041E42]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,64,124,0.4),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-muted mb-4">
          Faith &middot; Sports &middot; Community
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
          Centre Street
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
            Media
          </span>
        </h1>
        <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          BYU sports coverage, athlete stories, and officially licensed
          college gear &mdash; all in one place.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#videos"
            className="px-6 py-3 rounded-full bg-white text-[#041E42] font-semibold hover:bg-blue-50 transition-colors"
          >
            Watch Latest
          </a>
          <a
            href="#shop"
            className="px-6 py-3 rounded-full border border-white/25 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            Shop Gear
          </a>
        </div>
      </div>
    </section>
  );
}
