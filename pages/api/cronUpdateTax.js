// /pages/api/cronUpdateTax.js
import { ethers } from "ethers";
import InTaxABI from "../../contracts/InTax.json";

const INF_API_URL = "https://api.api-ninjas.com/v1/inflation?country=Canada";
const IN_TAX_ADDRESS = "0x06a252c76Da8aC8eE73AcbB45e5509CDD99b9a6e";

export default async function handler(req, res) {
  try {
    const ninjaKey = process.env.REALTIME_NINJA_API_KEY;
    const privateKey = process.env.MANAGER_WALLET_PRIVATE_KEY;
    const rpcUrl = process.env.RSK_RPC_URL; // e.g., https://public-node.rsk.co

    if (!ninjaKey || !privateKey || !rpcUrl) {
      return res.status(500).json({ error: "Missing env variables" });
    }

    const response = await fetch(INF_API_URL, {
      headers: { "X-Api-Key": ninjaKey }
    });

    const data = await response.json();
    const rate = Math.round(data[0].yearly_rate_pct || 3);

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(IN_TAX_ADDRESS, InTaxABI.abi, wallet);

    const tx = await contract.setTaxRate(rate);
    await tx.wait();
