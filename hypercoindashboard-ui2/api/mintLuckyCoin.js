// api/mintLuckyCoin.js
import { contract } from './utils/contract';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { to, amount } = req.body;
      const tx = await contract.mintLuckyCoin(to, amount);
      const receipt = await tx.wait();
      res.status(200).json({ tx_hash: receipt.transactionHash });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end();
  }
}