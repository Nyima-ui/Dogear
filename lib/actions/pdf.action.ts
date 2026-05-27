"use server";
import { IPdf } from "@/types";
import connectToMongoDB from "@/database/mongoose";
import Pdf from "@/database/models/pdf.model";

export const createPdf = async (payload: IPdf) => {
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

export const updateTotalSegments = async (
  pdfId: string,
  totalSegments: number,
) => {
  try {
    await connectToMongoDB();

    await Pdf.findByIdAndUpdate(pdfId, { totalSegments }, { new: true });

    return { success: true };
  } catch (e) {
    console.error("[updateTotalSegments]", e);
    return {
      success: false,
      error: e,
    };
  }
};
