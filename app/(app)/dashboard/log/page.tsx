import BookTable from "@/components/BookTable";
import { fetchBooksById } from "@/lib/actions/book.action";
import { auth } from "@clerk/nextjs/server";

const LogPage = async () => {
  const { userId } = await auth();

  //TODO: REDIRECT USER TO SIGN IN or show Modal
  if (!userId) return null;

  const result = await fetchBooksById(userId);
  const books = result.success ? result.data : [];
  return (
    <>
      <BookTable books={books} />
    </>
  );
};

export default LogPage;
