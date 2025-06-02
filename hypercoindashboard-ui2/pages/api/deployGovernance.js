// pages/api/deployGovernance.js
import { ethers } from 'ethers';
import governanceABI from '../../abi/governanceABI.json';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  try {
    const provider = new ethers.providers.JsonRpcProvider('https://public-node.testnet.rsk.co');
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const GovernanceFactory = new ethers.ContractFactory(
      governanceABI.abi,
      governanceABI.bytecode,
      wallet
    );

    const contract = await GovernanceFactory.deploy(process.env.CONTRACT_ADDRESS);
    await contract.deployed();

    res.status(200).json({ address: contract.address });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} 
