export function detectTone(userText) {
  const t = userText.toLowerCase();
  if (/(sad|down|upset|tired|lonely|depressed|😢|😭)/.test(t))
    return "empathetic";
  if (/(roast|roasting|insult|savage|🔥)/.test(t)) return "playful-roast";
  if (/(formal|sir|madam|dear)/.test(t)) return "formal";
  return "friendly";
}
