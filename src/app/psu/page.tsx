import { getCommunity } from "@/lib/communities";
import CommunityPage from "@/components/CommunityPage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "State Media PSU | Penn State Sports Content & Gear",
  description:
    "Penn State sports coverage, athlete interviews, and officially licensed Nittany Lions gear.",
};

export default function PSUPage() {
  const community = getCommunity("psu");
  if (!community) notFound();

  return <CommunityPage community={community} />;
}
