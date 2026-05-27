"use server";
import { IPdf } from "@/types";
import connectToMongoDB from "@/database/mongoose";
import Pdf from "@/database/models/pdf.model";

export const UploadBookPdf = async (payload: IPdf) => {
  try {
    await connectToMongoDB();

    const book = await Pdf.create({
      pdfUrl: payload.pdfUrl,
      coverUrl: payload.coverUrl,
      title: payload.title,
      slug: payload.slug,
      author: payload.author,
      persona: payload.persona,
      totalSegments: payload.totalSegments,
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(book)),
    };
  } catch (e) {
    console.error("[UploadBookPdf]", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }
};
