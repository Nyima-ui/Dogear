import { Schema, model, models } from "mongoose";
import { IBook } from "@/types";

const BookSchema = new Schema<IBook>(
  {
    clerkId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    status: { type: String, required: true },
    startDate: { type: Date },
    finishDate: { type: Date },
    rating: { type: Number },
    review: { type: String },
    coverUrl: { type: String },
  },
  { timestamps: true },
);

const Book = models.Book || model("Book", BookSchema);

export default Book;
