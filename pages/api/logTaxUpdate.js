// /pages/api/logTaxUpdate.js
export default async function handler(req, res) {
  const { account, rate } = req.body;
  if (!account || !rate) return res.status(400).json({ error: "Missing data" });

  const logEntry = {
    account,
    rate,
    timestamp: new Date().toISOString()
  };

  console.log("📜 Tax update log:", logEntry);
  // TODO: store log in DB, file, or 3rd-party service like Supabase, Firebase, etc.

  return res.status(200).json({ message: "Logged successfully" });
}
