import { getCommunity, getAllCommunities } from "@/lib/communities";
import CommunityPage from "@/components/CommunityPage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCommunities().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const community = getCommunity(slug);
  if (!community) return {};

  return {
    title: `${community.name} | ${community.shortName} Sports Content & Gear`,
    description: community.description,
  };
}

export default async function CommunitySlugPage({ params }: Props) {
  const { slug } = await params;
  const community = getCommunity(slug);
  if (!community) notFound();

  return <CommunityPage community={community} />;
}
