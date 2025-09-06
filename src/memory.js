import db from "./db.js";

// 1) make or update a user
export function upsertUser(user_id, maybeName) {
  const row = db.prepare("SELECT * FROM users WHERE user_id=?").get(user_id);
  if (!row) {
    db.prepare("INSERT INTO users(user_id, name) VALUES (?, ?)").run(
      user_id,
      maybeName || null
    );
  } else if (maybeName && !row.name) {
    db.prepare("UPDATE users SET name=? WHERE user_id=?").run(
      maybeName,
      user_id
    );
  }
}

// 2) save messages
export function saveMessage(user_id, role, text) {
  const info = db
    .prepare("INSERT INTO messages(user_id, role, text) VALUES (?,?,?)")
    .run(user_id, role, text);
  return info.lastInsertRowid;
}

// 3) simple rule-based fact extraction (cost-free)
export function extractFacts(userText) {
  const facts = [];
  const t = userText.toLowerCase();

  const nameMatch = userText.match(
    /\bmy name is\s+([A-Za-z][A-Za-z\s]{0,40})/i
  );
  if (nameMatch) facts.push(`user_name=${nameMatch[1].trim()}`);

  const likeMatch = userText.match(
    /\b(i like|i love|favorite|favourite)\s+([A-Za-z0-9 ,&\-]{1,60})/i
  );
  if (likeMatch) facts.push(`likes=${likeMatch[2].trim()}`);

  const liveMatch = userText.match(
    /\b(i live in|i'm from|i am from)\s+([A-Za-z0-9 ,\-]{1,60})/i
  );
  if (liveMatch) facts.push(`location=${liveMatch[2].trim()}`);

  return facts;
}

export function storeFacts(user_id, facts, source_msg_id) {
  const insert = db.prepare(
    "INSERT INTO memories(user_id,fact,source_msg_id) VALUES (?,?,?)"
  );
  for (const f of facts) insert.run(user_id, f, source_msg_id);
  // special case: persist name into users table
  const nameFact = facts.find((f) => f.startsWith("user_name="));
  if (nameFact) {
    const name = nameFact.split("=")[1];
    db.prepare("UPDATE users SET name=? WHERE user_id=?").run(name, user_id);
  }
}

// 4) get all facts (for prompt)
export function getFacts(user_id) {
  const rows = db
    .prepare(
      "SELECT fact FROM memories WHERE user_id=? ORDER BY id DESC LIMIT 50"
    )
    .all(user_id);
  return rows.map((r) => r.fact);
}

// 5) rolling summary (short notes for context)
export function getSummary(user_id) {
  const row = db
    .prepare("SELECT summary FROM summaries WHERE user_id=?")
    .get(user_id);
  return row?.summary || "";
}
export function updateSummary(user_id, text) {
  const exists = db
    .prepare("SELECT 1 FROM summaries WHERE user_id=?")
    .get(user_id);
  if (exists) {
    db.prepare(
      "UPDATE summaries SET summary=?, updated_at=datetime('now') WHERE user_id=?"
    ).run(text, user_id);
  } else {
    db.prepare("INSERT INTO summaries(user_id, summary) VALUES(?, ?)").run(
      user_id,
      text
    );
  }
}

// 6) fetch recent messages
export function recentMessages(user_id, limit = 12) {
  return db
    .prepare(
      "SELECT role,text FROM messages WHERE user_id=? ORDER BY id DESC LIMIT ?"
    )
    .all(user_id, limit)
    .reverse();
}
