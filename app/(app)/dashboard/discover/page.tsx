import {
  enrichRecommendations,
  fetchRecommendations,
} from "@/lib/actions/recommendations.action";
import { auth } from "@clerk/nextjs/server";
import RecommendationList from "@/components/RecommendationList";
import { redirect } from "next/navigation";

const RecommendationsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  const result = await fetchRecommendations(userId);
  const recommendations = result.success ? result.data : [];

  const enriched = recommendations?.books
    ? await enrichRecommendations(recommendations.books)
    : [];

  const sorted = enriched.sort((a, b) => {
    if (a.coverUrl && !b.coverUrl) return -1;
    if (!a.coverUrl && b.coverUrl) return 1;
    return 0;
  });
  return (
    <div className="mt-5 h-[85%] overflow-hidden">
      <RecommendationList books={sorted} />
    </div>
  );
};

export default RecommendationsPage;
