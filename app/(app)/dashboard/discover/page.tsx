import { fetchRecommendations } from "@/lib/actions/book.recommendation";
import { auth } from "@clerk/nextjs/server";

const RecommendationsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    // TODO: do something if user isn't logged in
    return;
  }
  const result = await fetchRecommendations(userId);
  const recommendations = result.success ? result.data : [];

  console.log(recommendations);
  return <div>RecommendationsPage</div>;
};

export default RecommendationsPage;
