import express from "express";
// import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// Import routes
import panicRoutes from "./routes/panic.routes";
// import contactRoutes from "./routes/contact.routes";
import { setupSwagger } from "./utils/swagger";
import { connectToDatabase } from "./config/db.config";
import Settings from "./config/settings.config";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
// app.use(
//   cors({
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Setup Swagger
setupSwagger(app);

// Routes
app.use("/api/panic", panicRoutes);
// app.use("/api/contacts", contactRoutes);

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

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(Settings.PORT, () => {
      console.log(`Server is running on port ${Settings.PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to database", err);
    process.exit(1); // Exit if DB connection fails
  }
};

startServer();
export default app;
