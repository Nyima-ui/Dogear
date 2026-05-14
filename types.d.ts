import { Document } from "mongoose";

export type BookStatus = "Reading" | "Finished" | "TBR";

export interface IBook extends Document {
  _id: string;
  clerkId: string;
  title: string;
  author: string;
  status: BookStatus;
  startDate: Date;
  finishDate: Date;
  rating: number;
  review: string;
  coverUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
