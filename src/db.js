import Database from "better-sqlite3";
import { join } from "node:path";
const db = new Database(join(process.cwd(), "stan.db"));

db.pragma("journal_mode = WAL");

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  user_id TEXT PRIMARY KEY,
  name TEXT,
  tone_pref TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  role TEXT CHECK(role IN ('user','assistant')),
  text TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS memories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  fact TEXT,
  source_msg_id INTEGER,
  confidence REAL DEFAULT 0.8,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS summaries (
  user_id TEXT PRIMARY KEY,
  summary TEXT,
  updated_at TEXT DEFAULT (datetime('now'))
);
`);

export default db;
