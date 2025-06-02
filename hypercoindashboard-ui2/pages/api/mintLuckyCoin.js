// File: /api/mint.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, amount } = req.body;
  if (!to || !amount) {
    return res.status(400).json({ error: 'Recipient and amount are required' });
  }

  try {
    const tx_hash = `0xMockMintTx_${Date.now()}`;
    res.status(200).json({ message: `Minted ${amount} wei to ${to}`, tx_hash });
  } catch (err) {
    console.error('Minting failed:', err);
    res.status(500).json({ error: 'Mint operation failed' });
  }
}
