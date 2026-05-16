import { Document } from "mongoose";

export type BookStatus = "Reading" | "Finished" | "TBR";


export interface IBook {
  clerkId: string;
  title: string;
  author: string;
  status: BookStatus;
  startDate?: Date;
  finishDate?: Date;
  rating?: number;
  review?: string;
  coverUrl?: string;
}

export interface IBookDocument extends IBook, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
