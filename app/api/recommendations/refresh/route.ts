import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Book from "@/database/models/book.model";
import Recommendation from "@/database/models/recommendations.model";
import connectToMongoDB from "@/database/mongoose";
import { fetchGeminiRecommendationPrompt } from "@/lib/constants";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const POST = async (req: NextRequest) => {
  const secret = req.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToMongoDB();

  const userIds = await Book.distinct("clerkId");

  for (const clerkId of userIds) {
    const books = await Book.find({ clerkId }).lean();

    const readBooks = books.filter((b) => b.status === "Finished");
    const tbrBooks = books.filter((b) => b.status === "TBR");
    const reading = books.filter((b) => b.status === "Reading");

    if (books.length === 0) continue;

    const prompt = fetchGeminiRecommendationPrompt({
      readBooks,
      tbrBooks,
      reading,
    });

    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const clean = text.replace(/```json|```/g, "").trim();
    const recommendations = JSON.parse(clean);

    await Recommendation.findOneAndUpdate(
      { clerkId },
      {
        books: recommendations,
        generatedAt: new Date(),
      },
      { upsert: true, new: true },
    );
  }

  return NextResponse.json({ success: true });
};
