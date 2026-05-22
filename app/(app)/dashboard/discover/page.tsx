import {
  enrichRecommendations,
  fetchRecommendations,
} from "@/lib/actions/recommendations.action";
import { auth } from "@clerk/nextjs/server";
import RecommendationsCard from "@/components/RecommendationsCard";

const RecommendationsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    // TODO: do something if user isn't logged in
    return;
  }
  const result = await fetchRecommendations(userId);
  const recommendations = result.success ? result.data : [];

  const enriched = recommendations?.books
    ? await enrichRecommendations(recommendations.books)
    : [];

  console.log(enriched);
  return (
    <div>
      <div>
        {enriched.map((b) => (
          <RecommendationsCard key={b._id} book={b} />
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default RecommendationsPage;
