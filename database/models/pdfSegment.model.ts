import { Schema, model, models } from "mongoose";
import { IPdfSegment } from "@/types";

const PdfSegmentSchema = new Schema<IPdfSegment>({
  pdfId: { type: Schema.Types.ObjectId, ref: "Pdf", required: true },
  text: { type: String, required: true },
  segmentIndex: { type: Number, required: true },
  wordCount: { type: Number, required: true },
  embedding: { type: [Number], required: true },
});

const PdfSegment = models.PdfSegment || model("PdfSegment", PdfSegmentSchema);
export default PdfSegment;
