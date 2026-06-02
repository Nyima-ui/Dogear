import BookTable from "@/components/BookTable";
import { fetchBooksById } from "@/lib/actions/book.action";
import { IBookDocument } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LogPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const { userId } = await auth();

  if (!userId) redirect("/");

  const { q } = await searchParams;

  const result = await fetchBooksById(userId);
  const allBooks: IBookDocument[] = result.success ? result.data : [];

  const books = q
    ? allBooks.filter(
        (b) =>
          b.title.toLowerCase().includes(q.toLowerCase()) ||
          b.author.toLowerCase().includes(q.toLowerCase()) ||
          b.review?.toLowerCase().includes(q.toLowerCase()),
      )
    : allBooks;

  return (
    <>
      <BookTable books={books} />
    </>
  );
};

export default LogPage;
