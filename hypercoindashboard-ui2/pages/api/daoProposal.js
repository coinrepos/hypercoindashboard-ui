// pages/api/stake.js
import { ethers } from 'ethers';
import stakingABI from '../../abi/stakingABI.json';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { amount } = req.body;

  try {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RSK_TESTNET_RPC_URL);
    const wallet = new ethers.Wallet(process.env.RSK_TESTNET_PRIVATE_KEY, provider);
    const contract = new ethers.Contract(process.env.STAKING_CONTRACT_ADDRESS, stakingABI, wallet);

    const tx = await contract.stake(ethers.utils.parseEther(amount));
    const receipt = await tx.wait();
    res.status(200).json({ txHash: receipt.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}