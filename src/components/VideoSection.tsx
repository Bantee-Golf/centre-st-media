"use client";

import { useState } from "react";
import Image from "next/image";
import { VIDEOS } from "@/lib/videos";

export default function VideoSection() {
  const [featured, setFeatured] = useState(VIDEOS[0]);
  const remaining = VIDEOS.filter((v) => v.id !== featured.id);

  return (
    <section id="videos" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold">Latest Videos</h2>
            <p className="text-muted mt-1">
              From{" "}
              <a
                href="https://www.youtube.com/@CenterStMedia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                @CenterStMedia
              </a>
            </p>
          </div>
          <a
            href="https://www.youtube.com/@CenterStMedia"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
          >
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Featured video player */}
        <div className="mb-8 rounded-2xl overflow-hidden bg-black aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${featured.id}?rel=0`}
            title={featured.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <h3 className="text-xl font-semibold mb-8">{featured.title}</h3>

        {/* Thumbnail grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {remaining.map((video) => (
            <button
              key={video.id}
              onClick={() => {
                setFeatured(video);
                document.getElementById("videos")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group text-left rounded-xl overflow-hidden bg-card-bg hover:ring-2 hover:ring-white/20 transition-all"
            >
              <div className="relative aspect-video">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* Play icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-red-600/90 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium line-clamp-2 text-white/90">
                  {video.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
