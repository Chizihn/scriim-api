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
//     origin:
//       process.env.NODE_ENV === "production"
//         ? [
//             "https://scriim-dwaycynpx-chizi-njokus-projects.vercel.app",
//             "https://scriim-api.vercel.app",
//             "https://scriim-web.vercel.app",
//           ]
//         : "*",
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

// For Vercel serverless deployment
if (process.env.NODE_ENV === "production") {
  // In production, we don't want to start the server with app.listen
  // Vercel will handle that for us
  // Just ensure database connection is established
  connectToDatabase()
    .then(() => console.log("Connected to database in serverless environment"))
    .catch((err) =>
      console.error(
        "Failed to connect to database in serverless environment",
        err
      )
    );
} else {
  // For local development, start the server as usual
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
}

export default app;
