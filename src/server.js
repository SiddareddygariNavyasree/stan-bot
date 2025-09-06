import "dotenv/config"; // 👈 MUST be first
import express from "express";
import cors from "cors";
import { chatHandler } from "./routes/chat.js";
import "./db.js"; // init db

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/chat", chatHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
  console.log(
    "Loaded key (first 10 chars):",
    process.env.GEMINI_API_KEY?.slice(0, 10)
  ); // debug
});
