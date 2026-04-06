export default function Footer() {
  return (
    <footer className="border-t border-border py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
                <span className="text-[#041E42] font-bold text-xs">CS</span>
              </div>
              <span className="font-bold text-sm">Centre St Media</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              Faith, sports, and community.
              <br />
              BYU athlete stories and college gear.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Follow</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a
                  href="https://www.youtube.com/@CenterStMedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/centerstmedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/centerstmedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  X / Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@centerstmedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Listen</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a
                  href="https://podcasts.apple.com/us/podcast/faith-huddle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Apple Podcasts
                </a>
              </li>
              <li>
                <a
                  href="https://open.spotify.com/show/3krF2xj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Spotify
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} Centre Street Media</p>
          <p>
            Shop checkout powered by{" "}
            <a
              href="https://rye.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              Rye
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
