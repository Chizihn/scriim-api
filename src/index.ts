import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Import routes
import panicRoutes from "./routes/panic.routes";
// import contactRoutes from "./routes/contact.routes";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
const mongoUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/panic-app";

// For Vercel serverless functions, we need to handle MongoDB connections differently
let cachedDb: typeof mongoose | null = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const db = await mongoose.connect(mongoUri);
  cachedDb = db;
  return db;
}

// Connect to MongoDB before handling requests
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Routes
app.use("/api/panic", panicRoutes);
// app.use("/api/contacts", contactRoutes);

// Root route for API information
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running",
    endpoints: {
      panic: "/api/panic",
    },
  });
});

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// Start server in development mode
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;
