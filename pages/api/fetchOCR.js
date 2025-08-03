// /src/pages/api/fetchOCR.js or /api/fetchOCR.js in Express setup
export default async function handler(req, res) {
  const apiKey = process.env.REALTIME_NINJA_API_KEY; // Add this in your .env file
  const { query } = req.body;

  if (!apiKey || !query) {
    return res.status(400).json({ error: "Missing API key or query" });
  }

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/ocr`, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: query }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "API fetch failed");
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
