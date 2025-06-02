// pages/api/mint.js
import { ethers } from 'ethers';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, amount } = req.body;
  if (!to || !amount) {
    return res.status(400).json({ error: 'Recipient and amount are required' });
  }

  try {
    const provider = new ethers.providers.JsonRpcProvider('https://public-node.testnet.rsk.co');
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const abi = [
      "function mint(address user, uint256 amount) external"
    ];

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi,
      signer
    );

    const tx = await contract.mint(to, amount);
    await tx.wait();

    res.status(200).json({ message: `Minted ${amount} wei to ${to}`, tx_hash: tx.hash });
  } catch (err) {
    console.error('Minting failed:', err);
    res.status(500).json({ error: 'Mint operation failed', details: err.message });
  }
}
