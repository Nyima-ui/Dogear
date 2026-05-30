import { getBatchEmbeddingsWithNomicAPI } from "@/lib/embeddings";
import connectToMongoDB from "@/database/mongoose";
import PdfSegment from "@/database/models/pdfSegment.model";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";

const searchWithVectors = async (pdfId: string, query: string) => {
  const embeddings = await getBatchEmbeddingsWithNomicAPI([query]);
  if (!embeddings) return null;
  const queryVector = embeddings[0];

  const results = await PdfSegment.aggregate([
    {
      $vectorSearch: {
        index: "embedding_index",
        path: "embedding",
        queryVector,
        numCandidates: 50,
        limit: 3,
        filter: { pdfId: new mongoose.Types.ObjectId(pdfId) },
      },
    },
    {
      $project: { text: 1, score: { $meta: "vectorSearchScore" } },
    },
  ]);

  return results.map((r: { text: string }) => r.text).join("\n\n");
};

export const POST = async (request: NextRequest) => {
  try {
    await connectToMongoDB();
    const body = await request.json();

    const toolCallList =
      body?.message?.toolCallList || body?.message?.toolCalls;
    if (!toolCallList?.length) {
      return NextResponse.json({
        results: [{ result: "No tool calls found" }],
      });
    }

    const results = [];
    for (const toolCall of toolCallList) {
      const { id, function: func } = toolCall;
      //we are paring the json (string below) because we want the args to be an object. POJO.
      const args =
        typeof func.arguments === "string"
          ? JSON.parse(func.arguments)
          : func.arguments;

      if (func.name === "search_from_pdf") {
        const text = await searchWithVectors(args.pdfId, args.query);
        results.push({
          toolCallId: id,
          result: text ?? "No relevant information found in this book.",
        });
      }
    }

    return NextResponse.json({ results });
  } catch (e) {
    console.error(`VAPI search error`, e);
    return NextResponse.json({
      results: [{ result: "Error processsing request." }],
    });
  }
};
