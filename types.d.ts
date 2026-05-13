import { Document } from "mongoose";

export interface IBook extends Document {
  _id: string;
  clerkId: string;
  title: string;
  author: string;
  status: "Finished" | "Reading" | "TBR";
  startDate: Date;
  finishDate: Date;
  rating: number;
  review: string;
  coverUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
