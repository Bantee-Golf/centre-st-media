import { DEFAULT_COMMUNITY } from "@/lib/communities";
import CommunityPage from "@/components/CommunityPage";

export default function Home() {
  return <CommunityPage community={DEFAULT_COMMUNITY} />;
}
