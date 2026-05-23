"use server";
import Book from "@/database/models/book.model";
import connectToMongoDB from "@/database/mongoose";
import { IBook } from "@/types";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export const createBook = async (bookPayload: IBook) => {
  try {
    await connectToMongoDB();
    const book = await Book.create(bookPayload);

    revalidatePath("/dashboard/log");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(book)),
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.error("[createBook ERROR]", errorMessage, e);
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const fetchBooksById = async (id: string) => {
  try {
    await connectToMongoDB();

    const books = await Book.find({ clerkId: id }).lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(books)),
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.error("[fetchBooksById ERROR]", errorMessage, e);
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const deleteBookById = async (id: string | string[]) => {
  try {
    await connectToMongoDB();

    const ids = Array.isArray(id) ? id : [id];

    const books = await Book.find({ _id: { $in: ids } }).select("coverUrl");

    const coverUrls = books
      .map((b) => b.coverUrl)
      .filter((url) => url && url.includes("vercel-storage.com"));

    // const coverUrls = books.map((b) => b.coverUrl).filter(Boolean);

    if (coverUrls.length > 0) {
      await del(coverUrls);
    }

    await Book.deleteMany({ _id: { $in: ids } });

    revalidatePath("/dashboard/log");

    return {
      success: true,
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.error("[deleteBookById ERROR]", errorMessage, e);
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const updateBook = async (
  bookId: string,
  bookPayload: IBook,
  oldCoverUrl?: string,
) => {
  try {
    await connectToMongoDB();

    if (
      oldCoverUrl &&
      bookPayload.coverUrl &&
      oldCoverUrl !== bookPayload.coverUrl
    ) {
      await del(oldCoverUrl);
    }

    await Book.findByIdAndUpdate(bookId, bookPayload, {
      new: true,
    });

    revalidatePath("/dashboard/log");
    return {
      success: true,
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.error("[updateBook ERROR]", errorMessage, e);
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const deleteBlobUrl = async (url: string) => {
  await del(url);
};

export const addAsTBR = async (payload: IBook) => {
  try {
    await connectToMongoDB();

    const book = await Book.create(payload);

    revalidatePath("/dashboard/log");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(book)),
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.error("[addAsTBR ERROR]", errorMessage, e);
    return {
      success: false,
      error: errorMessage,
    };
  }
};
