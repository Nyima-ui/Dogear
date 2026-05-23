"use server";
import { TrendingBook as TrendingBookProps } from "@/types";
import { hardCoverQuery } from "../constants";

export const fetchTrendingBooks = async () => {
  try {
    const response = await fetch("https://api.hardcover.app/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${process.env.HARDCOVER_BEARER_TOKEN}`,
      },
      body: JSON.stringify({ query: hardCoverQuery }),
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch trending books.");
    }

    const result = await response.json();
    const books = result.data.books;

    const trendingBooks: TrendingBookProps[] = books.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (book: any, index: number) => ({
        rank: index + 1,
        title: book.title,
        author: book.contributions?.[0]?.author?.name ?? "Unknown",
        coverUrl: book.image?.url ?? null,
        reads: book.users_read_count,
        publishedYear: book.editions?.[0]?.release_date
          ? new Date(book.editions[0].release_date).getFullYear()
          : null,
        rating: book.rating ? Number(book.rating).toFixed(1) : null,
        description: book.description ?? null,
      }),
    );

    return {
      success: true,
      data: trendingBooks,
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
};
