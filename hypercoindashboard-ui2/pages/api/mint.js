// pages/api/mint.js
import { ethers } from 'ethers';
import wrappedCoinABI from '../../abi/wrappedHyperCoinABI.json';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { to, amount } = req.body;

  try {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RSK_TESTNET_RPC_URL);
    const wallet = new ethers.Wallet(process.env.RSK_TESTNET_PRIVATE_KEY, provider);
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, wrappedCoinABI, wallet);

    const tx = await contract.mint(to, ethers.utils.parseEther(amount));
    const receipt = await tx.wait();
    res.status(200).json({ txHash: receipt.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} 