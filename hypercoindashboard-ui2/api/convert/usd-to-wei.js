// api/convert/usd-to-wei.js
export default async function handler(req, res) {
  const { usd } = req.query;
  if (!usd || isNaN(usd)) {
    return res.status(400).json({ error: 'Invalid or missing USD value' });
  }
  const ethPerUsd = 0.00039604;
  const wei = BigInt(Math.floor(parseFloat(usd) * ethPerUsd * 1e18));
  res.status(200).json({ wei: wei.toString() });
}
