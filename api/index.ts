import app from "../src/index";
import { connectToDatabase } from "../src/config/db.config";

// Connect to database for serverless environment
connectToDatabase().catch((err) => {
  console.error("Failed to connect to database in serverless mode", err);
});

export default app;
