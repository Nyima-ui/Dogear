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

export interface RecommendedBook {
  title: string;
  author: string;
  reason?: string;
  genre?: string;
}

export interface IRecommendations {
  clerkId: string;
  books: RecommendedBook[];
  generatedAt: Date;
}

export interface IRecommendationsDocument extends IRecommendations, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FetchGeminiRecommendationPromptProps {
  readBooks: IBookDocument[];
  reading: IBookDocument[];
  tbrBooks: IBookDocument[];
}

export interface EnrichedBook extends RecommendedBook {
  _id?: string;
  coverUrl?: string;
  description?: string;
  rating?: number;
}


export interface TrendingBook {
  rank: number;
  title: string;
  author: string;
  coverUrl: string | null;
  reads: number;
  publishedYear: number | null;
  rating: number | null;
  description: string | null;
}