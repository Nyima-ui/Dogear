import { Schema, model, models } from "mongoose";
import { IRecommendationsDocument } from "@/types";

const RecommendationsSchema = new Schema<IRecommendationsDocument>(
  {
    clerkId: { type: String, required: true, unique: true },
    books: {
      type: [
        {
          title: { type: String, required: true },
          author: { type: String, required: true },
          reason: { type: String },
          genre: { type: String },
        },
      ],
      required: true,
      default: [],
    },
    generatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Recommendation =
  models.Recommendation || model("Recommendation", RecommendationsSchema);

export default Recommendation;
