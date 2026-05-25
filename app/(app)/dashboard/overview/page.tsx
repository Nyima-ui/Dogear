import { auth } from "@clerk/nextjs/server";
import BarChart from "@/components/BarChart";
import { fetchBooksById as fetchBooksByUserId } from "@/lib/actions/book.action";
import OverviewCards from "@/components/OverviewCards";

const OverviewPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    // TODO: send user to somewhere
    return;
  }

  const result = await fetchBooksByUserId(userId);
  const books = result.success ? (result.data ?? []) : [];

  return (
    <div className="mt-5">
      <h2 className="text-xl text-foreground/80">Books read</h2>
      <BarChart books={books} />

      <OverviewCards books={books} />
    </div>
  );
};

export default OverviewPage;
