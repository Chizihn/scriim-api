// api/index.ts
import express from "express";
const app = express();

app.get("/*", (req, res) => {
  res.json({ status: "working", path: req.path });
});

export default app;
