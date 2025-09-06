import { z } from "zod";
import { completeText } from "../llm.js";
import { detectTone } from "../tone.js";
import {
  upsertUser,
  saveMessage,
  extractFacts,
  storeFacts,
  getFacts,
  getSummary,
  updateSummary,
  recentMessages,
} from "../memory.js";
import { buildSystemPrompt, summaryPrompt } from "../prompts.js";

const Body = z.object({
  user_id: z.string().min(1),
  message: z.string().min(1),
});

export async function chatHandler(req, res) {
  const parse = Body.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: "bad input" });
  const { user_id, message } = parse.data;

  // 1) ensure user exists, store user message
  upsertUser(user_id);
  const userMsgId = saveMessage(user_id, "user", message);

  // 2) tone + memory
  const tone = detectTone(message);
  const facts = getFacts(user_id);
  const summary = getSummary(user_id);

  // 3) build prompt
  const sys = buildSystemPrompt({
    botName: process.env.BOT_NAME || "Nova",
    facts,
    summary,
    tone,
  });

  // 4) stitch transcript to give the model light context
  const history = recentMessages(user_id, 8)
    .map((m) => `${m.role === "user" ? "User" : "You"}: ${m.text}`)
    .join("\n");
  const fullPrompt = `${sys}\n\nConversation so far:\n${history}\n\nUser: ${message}\nYou:`;

  // 5) get reply
  const reply = await completeText(fullPrompt);

  // 6) save assistant reply
  saveMessage(user_id, "assistant", reply);

  // 7) extract and store any new facts from this user message
  const factsFound = extractFacts(message);
  if (factsFound.length) storeFacts(user_id, factsFound, userMsgId);

  // 8) occasionally refresh rolling summary (every ~6 user msgs)
  const userMsgCount = recentMessages(user_id, 1000).filter(
    (m) => m.role === "user"
  ).length;
  if (userMsgCount % 6 === 0) {
    const transcript = recentMessages(user_id, 20)
      .map((m) => `${m.role}: ${m.text}`)
      .join("\n");
    const memo = await completeText(summaryPrompt(transcript));
    updateSummary(user_id, memo);
  }

  res.json({ reply, tone, facts_added: factsFound });
}
