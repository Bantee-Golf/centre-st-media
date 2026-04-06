"use client";

import { useState } from "react";
import Image from "next/image";
import { Community } from "@/lib/communities";

interface Props {
  community: Community;
}

export default function VideoSection({ community }: Props) {
  const { videos } = community;
  const [featured, setFeatured] = useState(videos[0]);
  const remaining = videos.filter((v) => v.id !== featured.id);

  return (
    <section id="videos" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-2">
              Latest Content
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">Videos</h2>
          </div>
          <a
            href={`https://www.youtube.com/${community.youtubeHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group"
          >
            {community.youtubeHandle}
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Featured video */}
        <div className="rounded-2xl overflow-hidden bg-black shadow-2xl shadow-black/40">
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${featured.id}?rel=0&modestbranding=1`}
              title={featured.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mt-5 mb-10 text-white/90">
          {featured.title}
        </h3>

        {/* Thumbnail grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {remaining.map((video) => (
            <button
              key={video.id}
              onClick={() => {
                setFeatured(video);
                document
                  .getElementById("videos")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group text-left rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.04] hover:border-white/[0.12] hover:bg-white/[0.06] transition-all"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                    <svg className="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs sm:text-sm font-medium line-clamp-2 text-white/70 group-hover:text-white/90 transition-colors">
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
