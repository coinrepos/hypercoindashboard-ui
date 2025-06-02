// pages/api/stake.js
import { ethers } from 'ethers';
import contractABI from '../../abi/wrappedHyperCoinABI.json';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { to, amount } = req.body;
  try {
    const provider = new ethers.providers.JsonRpcProvider('https://public-node.testnet.rsk.co');
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

    const tx = await contract.stake(to, ethers.utils.parseEther(amount));
    const receipt = await tx.wait();

    res.status(200).json({ tx_hash: receipt.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// pages/api/daoProposal.js
import { ethers } from 'ethers';
import governanceABI from '../../abi/hyperCoinGovernanceABI.json';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { description } = req.body;
  try {
    const provider = new ethers.providers.JsonRpcProvider('https://public-node.testnet.rsk.co');
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(process.env.GOVERNANCE_CONTRACT_ADDRESS, governanceABI, wallet);

    const tx = await contract.createProposal(description);
    const receipt = await tx.wait();

    res.status(200).json({ tx_hash: receipt.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// components/HyperBotTaskMap.js (simplified integration)
export const HyperBotTaskMap = {
  autoMint: async (wallet) => {
    await fetch('/api/mint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: wallet, amount: "1.0" })
    });
  },
  autoStake: async (wallet) => {
    await fetch('/api/stake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: wallet, amount: "1.0" })
    });
  },
  autoProposal: async (description) => {
    await fetch('/api/daoProposal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description })
    });
  }
};
