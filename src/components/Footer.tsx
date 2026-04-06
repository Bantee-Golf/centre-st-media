import { Community } from "@/lib/communities";

interface Props {
  community: Community;
  allCommunities: Community[];
}

export default function Footer({ community, allCommunities }: Props) {
  return (
    <footer className="border-t border-white/[0.04] py-14 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-[11px]"
                style={{ backgroundColor: community.colors.accent, color: "#fff" }}
              >
                {community.shortName.slice(0, 2).toUpperCase()}
              </div>
              <span className="font-semibold text-sm">{community.name}</span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed max-w-xs">
              {community.description}
            </p>
          </div>

          {/* Communities */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/20 mb-4">Communities</h4>
            <ul className="space-y-2.5 text-sm">
              {allCommunities.map((c) => (
                <li key={c.slug}>
                  <a
                    href={`/${c.slug === "byu" ? "" : c.slug}`}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/20 mb-4">Follow</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`https://www.youtube.com/${community.youtubeHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href={community.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  {community.storeName}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/20">
          <p>&copy; {new Date().getFullYear()} Centr St Media</p>
          <p>
            Checkout by{" "}
            <a href="https://rye.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/40 transition-colors">
              Rye
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
