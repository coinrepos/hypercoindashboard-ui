// pages/api/governance.js
import { ethers } from 'ethers';
import governanceABI from '../../abi/governanceABI.json';

const provider = new ethers.providers.JsonRpcProvider('https://public-node.testnet.rsk.co');
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.GOVERNANCE_CONTRACT_ADDRESS, governanceABI.abi, wallet);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { action, data } = req.body;

  try {
    let result;
    switch (action) {
      case 'createProposal':
        result = await contract.createProposal(data.description);
        break;
      case 'vote':
        result = await contract.vote(data.proposalId, data.support);
        break;
      case 'executeProposal':
        result = await contract.executeProposal(data.proposalId);
        break;
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
    const receipt = await result.wait();
    res.status(200).json({ txHash: receipt.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
