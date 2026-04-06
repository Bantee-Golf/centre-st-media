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
        // Set CSS variables for this community's color scheme
        ["--background" as string]: community.colors.darker,
        ["--surface" as string]: community.colors.dark,
      }}
    >
      <Header community={community} allCommunities={allCommunities} />
      <main>
        <Hero community={community} />
        <VideoSection community={community} />
        <ShopSection community={community} />
      </main>
      <Footer community={community} allCommunities={allCommunities} />
    </div>
  );
}
