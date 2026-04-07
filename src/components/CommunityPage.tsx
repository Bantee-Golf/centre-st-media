import { Community } from "@/lib/communities";
import { getAllCommunities } from "@/lib/communities";
import Header from "./Header";
import Hero from "./Hero";
import VideoSection from "./VideoSection";
import ShopSection from "./ShopSection";
import Footer from "./Footer";

interface Props {
  community: Community;
}

export default function CommunityPage({ community }: Props) {
  const allCommunities = getAllCommunities();

  return (
    <div
      style={{
        ["--background" as string]: community.colors.darker,
        ["--surface" as string]: community.colors.dark,
      }}
    >
      <Header community={community} allCommunities={allCommunities} />
      <main>
        <Hero community={community} />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-10">
            <VideoSection community={community} />
            <ShopSection community={community} />
          </div>
        </div>
      </main>
      <Footer community={community} allCommunities={allCommunities} />
    </div>
  );
}
