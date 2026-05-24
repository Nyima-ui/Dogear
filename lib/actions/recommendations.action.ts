"use server";
import Recommendation from "@/database/models/recommendations.model";
import connectToMongoDB from "@/database/mongoose";
import { EnrichedBook, RecommendedBook } from "@/types";

export const fetchRecommendations = async (userId: string) => {
  try {
    await connectToMongoDB();

    const rec = await Recommendation.findOne({ clerkId: userId }).lean();

    return {
      success: true,
      data: rec ? JSON.parse(JSON.stringify(rec)) : null,
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.error("[fetchRecommendations ERROR]", errorMessage, e);
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const enrichBookWithOpenLibrary = async (
  title: string,
  author: string,
) => {
  try {
    const query = encodeURIComponent(`${title} ${author}`);
    const searchRes = await fetch(
      `https://openlibrary.org/search.json?q=${query}&limit=1&fields=key,cover_i,ratings_average`,
      { next: { revalidate: 86400 } },
    );

    const searchData = await searchRes.json();
    const book = searchData.docs?.[0];
    if (!book) return {};

    const coverUrl = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      : undefined;

    const rating = book.ratings_average
      ? parseFloat(book.ratings_average.toFixed(1))
      : undefined;

    let description: string | undefined;
    if (book.key) {
      const worksRes = await fetch(`https://openlibrary.org${book.key}.json`, {
        next: { revalidate: 86400 },
      });
      const worksData = await worksRes.json();

      const raw = worksData.description;
      description = typeof raw === "string" ? raw : raw?.value;
    }

    return { coverUrl, rating, description };
  } catch {
    return {};
  }
};

export const enrichRecommendations = async (
  books: RecommendedBook[],
): Promise<EnrichedBook[]> => {
  const enriched = await Promise.all(
    books.map(async (book) => {
      const extra = await enrichBookWithOpenLibrary(book.title, book.author);
      return { ...book, ...extra };
    }),
  );

  return enriched;
};
