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
    <section id="videos">
      {/* Section header */}
      <div className="flex items-end justify-between mb-5">
        <h2 className="text-xl font-bold">Videos</h2>
        <a
          href={`https://www.youtube.com/${community.youtubeHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white transition-colors group"
        >
          {community.youtubeHandle}
          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Featured video */}
      <div className="rounded-xl overflow-hidden bg-black shadow-2xl shadow-black/40">
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
      <h3 className="text-sm font-semibold mt-3 mb-6 text-white/80 line-clamp-2">
        {featured.title}
      </h3>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {remaining.map((video) => (
          <button
            key={video.id}
            onClick={() => {
              setFeatured(video);
              document
                .getElementById("videos")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group text-left rounded-lg overflow-hidden bg-white/[0.03] border border-white/[0.04] hover:border-white/[0.12] hover:bg-white/[0.06] transition-all"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                  <svg className="w-3.5 h-3.5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-2">
              <p className="text-[11px] font-medium line-clamp-2 text-white/60 group-hover:text-white/85 transition-colors">
                {video.title}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
