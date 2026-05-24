import { fetchTrendingBooks } from "@/lib/actions/trending.action";
import TrendingList from "@/components/TrendingList";

const TrendingPage = async () => {
  const result = await fetchTrendingBooks();
  const trendingBooks = result.success ? (result.data ?? []) : [];
  return (
    <div className="mt-5 h-[85%]">
      <TrendingList books={trendingBooks} />
    </div>
  );
};

export default TrendingPage;
