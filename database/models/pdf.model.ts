import { model, models, Schema } from "mongoose";
import { IPdf } from "@/types";

const pdfSchema = new Schema<IPdf>(
  {
    clerkId: { type: String, required: true },
    pdfUrl: { type: String, required: true },
    coverUrl: { type: String },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    author: { type: String, required: true },
    persona: { type: String },
    totalSegments: { type: Number },
  },
  {
    timestamps: true,
  },
);

const Pdf = models.Pdf || model<IPdf>("Pdf", pdfSchema);

export default Pdf;
