"use server";
import Recommendation from "@/database/models/recommendations.model";
import connectToMongoDB from "@/database/mongoose";

export const fetchRecommendations = async (userId: string) => {
  try {
    await connectToMongoDB();

    const rec = await Recommendation.findOne({ clerkId: userId }).lean();

    return {
      success: true,
      data: rec ? JSON.parse(JSON.stringify(rec)) : null,
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
};
