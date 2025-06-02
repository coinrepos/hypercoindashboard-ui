// pages/api/deployDAO.js
import { ethers } from 'ethers';
import flattenedABI from '../../abi/flattenedWrappedHyperCoinABI.json';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  try {
    const provider = new ethers.providers.JsonRpcProvider('https://public-node.testnet.rsk.co');
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      flattenedABI,
      wallet
    );

    const tx = await contract.deployDAO(); // This MUST be defined in your Solidity
    const receipt = await tx.wait();

    res.status(200).json({ tx_hash: receipt.transactionHash });
  } catch (err) {
    console.error('DAO Deploy Failed:', err);
    res.status(500).json({ error: err.message });
  }
}
