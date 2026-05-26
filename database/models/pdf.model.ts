import { model, models, Schema } from "mongoose";
import { IPdf } from "@/types";

const pdfSchema = new Schema<IPdf>(
  {
    pdfUrl: { type: String, required: true },
    coverUrl: { type: String },
    title: { type: String, required: true },
    author: { type: String, required: true },
    persona: { type: String },
  },
  {
    timestamps: true,
  },
);

const Pdf = models.Pdf || model<IPdf>("Pdf", pdfSchema);

export default Pdf;
