// utils/contract.js
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';

const abiPath = path.join(process.cwd(), 'abi', 'wrappedHyperCoinABI.json');
const contractABI = JSON.parse(fs.readFileSync(abiPath));
const contractAddress = '0xB8Ce1CA8e08d2D67CF029527C4ffe656DE801AD5';

const provider = new ethers.providers.JsonRpcProvider('https://public-node.testnet.rsk.co');
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
export const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// api/deployDAO.js
import { contract } from './utils/contract';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const tx = await contract.deployDAO();
      const receipt = await tx.wait();
      res.status(200).json({ tx_hash: receipt.transactionHash });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end();
  }
}
