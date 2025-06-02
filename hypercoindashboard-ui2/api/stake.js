// pages/api/stake.js
import { ethers } from 'ethers';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount } = req.body;
  if (!amount) {
    return res.status(400).json({ error: 'Amount is required' });
  }

  try {
    const provider = new ethers.providers.JsonRpcProvider('https://public-node.testnet.rsk.co');
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const abi = [
      "function stake(uint256 amount) external",
    ];

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
      abi,
      signer
    );

    const tx = await contract.stake(amount);
    await tx.wait();

    res.status(200).json({ message: `Staked ${amount} wei`, tx_hash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: 'Stake failed', details: err.message });
  }
}
