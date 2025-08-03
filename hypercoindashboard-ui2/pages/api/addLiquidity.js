// pages/api/addLiquidity.js
import { ethers } from 'ethers';
import taskMap from '@/utils/HyperBotTaskMap';
import liquidityABI from '@/abi/liquidityPoolABI.json';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  try {
    const { tokenA, tokenB, amountA, amountB } = req.body;

    const provider = new ethers.providers.JsonRpcProvider(process.env.RSK_TESTNET_RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const liquidityPool = new ethers.Contract(process.env.LIQUIDITY_POOL_ADDRESS, liquidityABI, signer);

    const tx = await liquidityPool.addLiquidity(tokenA, tokenB, amountA, amountB);
    const receipt = await tx.wait();

    taskMap.onDexPoolCreated(tokenA, tokenB);
    taskMap.onLiquidityAdded(amountA, amountB);

    res.status(200).json({ txHash: receipt.transactionHash });
  } catch (err) {
    taskMap.onError('addLiquidity', err);
    res.status(500).json({ error: err.message });
  }
}
