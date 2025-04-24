import mongoose from "mongoose";
import dotenv from "dotenv";
import settings from "./settings.config";

dotenv.config();

export async function connectToDatabase() {
  try {
    console.log("connecing");

    const db = await mongoose.connect(settings.MONGO_URI as string);
    console.log("✅ Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
