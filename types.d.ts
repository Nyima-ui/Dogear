import { Document } from "mongoose";

export type BookStatus = "Reading" | "Finished" | "TBR";

export type Status = "Reading" | "Finished" | "TBR" | "None";
export type Rating = 1 | 2 | 3 | 4 | 5 | undefined;

export interface IBook {
  clerkId: string;
  title: string;
  author: string;
  status: BookStatus;
  startDate?: Date;
  finishDate?: Date;
  rating?: Rating;
  review?: string;
  coverUrl?: string;
}

export interface IBookDocument extends IBook, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
