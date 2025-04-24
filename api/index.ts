import express from "express";
const app = express();

// Add a route that logs requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Simple test route
app.get("*", (req, res) => {
  res.status(200).json({
    message: "Debug route working",
    path: req.path,
    query: req.query,
    method: req.method,
  });
});

export default app;
