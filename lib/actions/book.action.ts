"use server";
import Book from "@/database/models/book.model";
import connectToMongoDB from "@/database/mongoose";
import { IBook } from "@/types";

export const createBook = async (bookPayload: IBook) => {
  try {
    await connectToMongoDB();
    const book = await Book.create(bookPayload);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(book)),
    };
  } catch (e) {
    return {
      success: false,
      error: e,
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
    return {
      success: false,
      error: e,
    };
  }
};
