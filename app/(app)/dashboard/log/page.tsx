import BookTable from "@/components/BookTable";
import { fetchBooksById } from "@/lib/actions/book.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LogPage = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/");

  const result = await fetchBooksById(userId);
  const books = result.success ? result.data : [];
  return (
    <>
      <BookTable books={books} />
    </>
  );
};

export default LogPage;
