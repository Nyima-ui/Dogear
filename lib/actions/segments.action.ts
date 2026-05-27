"use server";
import { Segment } from "@/types";
import connectToMongoDB from "@/database/mongoose";
import { BATCH_SIZE, BATCH_DELAY_MS } from "../constants";
import { delay } from "../utils";
import { getBatchEmbeddingsWithNomicAPI } from "../embeddings";
import PdfSegment from "@/database/models/pdfSegment.model";

export const createPdfSegments = async (pdfId: string, segments: Segment[]) => {
  try {
    await connectToMongoDB();

    if (!pdfId) {
      throw new Error("pdfId is required");
    }

    const chunks: Segment[][] = [];
    for (let i = 0; i < segments.length; i += BATCH_SIZE) {
      chunks.push(segments.slice(i, i + BATCH_SIZE));
    }

    console.log(
      `Processing ${segments.length} segments in ${chunks.length} batches...`,
    );

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(
        `Batch ${i + 1}/${chunks.length} - embedding ${chunk.length} segments.`,
      );

      const embeddings = await getBatchEmbeddingsWithNomicAPI(
        chunk.map((s) => s.text),
      );

      await PdfSegment.insertMany(
        chunk.map((segment, j) => ({
          pdfId,
          text: segment.text,
          segmentIndex: segment.segmentIndex,
          wordCount: segment.wordCount,
          embedding: embeddings[j],
        })),
      );

      if (i < chunks.length - 1) {
        await delay(BATCH_DELAY_MS);
      }
    }

    return {
      success: true,
      totalSegments: segments.length,
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.error("[createPdfSegments]", errorMessage, e);
    return {
      success: false,
      error: errorMessage,
    };
  }
};
