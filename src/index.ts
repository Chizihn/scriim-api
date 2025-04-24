import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// Import routes
import panicRoutes from "./routes/panic.routes";
import { setupSwagger } from "./utils/swagger";
import { connectToDatabase } from "./config/db.config";
import Settings from "./config/settings.config";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup Swagger
setupSwagger(app);

// Routes
app.use("/api/panic", panicRoutes);

// Root route for API information
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running",
    endpoints: {
      panic: "/api/panic",
      docs: "/api-docs",
    },
  });
});

// Add a catch-all route for debugging
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
    method: req.method,
    path: req.originalUrl,
  });
});

// Connect to database when needed
const initializeDatabase = async () => {
  try {
    await connectToDatabase();
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to database", err);
  }
};

// Start server only in development
if (process.env.NODE_ENV !== "production") {
  initializeDatabase().then(() => {
    app.listen(Settings.PORT, () => {
      console.log(`Server is running on port ${Settings.PORT}`);
    });
  });
}

// Always export the app
export default app;
