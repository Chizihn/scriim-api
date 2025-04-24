import mongoose from "mongoose";
import settings from "./settings.config";

export const connectToDatabase = async () => {
  console.log("connecting to database...");
  await mongoose.connect(settings.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // Add timeout
  });
  return mongoose.connection;
};
