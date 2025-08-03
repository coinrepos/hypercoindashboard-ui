// pages/api/checkLiquidity.js
import { ethers } from 'ethers';
import taskMap from '@/utils/HyperBotTaskMap';
import liquidityABI from '@/abi/liquidityPoolABI.json';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end('Method Not Allowed');

  try {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RSK_TESTNET_RPC_URL);
    const pool = new ethers.Contract(process.env.LIQUIDITY_POOL_ADDRESS, liquidityABI, provider);

    const reserves = await pool.getReserves();
    const status = {
      tokenA: reserves[0].toString(),
      tokenB: reserves[1].toString(),
    };

    taskMap.onCheckLiquidityStatus(status);
    res.status(200).json(status);
  } catch (err) {
    taskMap.onError('checkLiquidity', err);
    res.status(500).json({ error: err.message });
  }
}
