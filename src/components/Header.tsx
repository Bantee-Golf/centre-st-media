"use client";

import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
              <span className="text-[#041E42] font-bold text-lg">CS</span>
            </div>
            <span className="text-lg font-bold tracking-tight">
              Centre St Media
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#videos"
              className="text-sm text-muted hover:text-white transition-colors"
            >
              Videos
            </a>
            <a
              href="#shop"
              className="text-sm text-muted hover:text-white transition-colors"
            >
              Shop
            </a>
            <a
              href="https://www.youtube.com/@CenterStMedia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
            >
              Subscribe
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-muted hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <a
              href="#videos"
              className="text-sm text-muted hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Videos
            </a>
            <a
              href="#shop"
              className="text-sm text-muted hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Shop
            </a>
            <a
              href="https://www.youtube.com/@CenterStMedia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-center px-4 py-2 rounded-full bg-red-600 text-white font-medium"
            >
              Subscribe on YouTube
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
