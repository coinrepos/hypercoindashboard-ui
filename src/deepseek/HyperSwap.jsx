import React, { useState } from 'react';
import { ethers } from 'ethers';
import SWAP_ABI from '../../contracts/HyperSwap.json';

export default function HyperSwap({ swapAddress }) {
  const [fromToken, setFromToken] = useState('KREDS');
  const [toToken, setToToken] = useState('ETH');
  const [amount, setAmount] = useState('');

  const executeSwap = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(swapAddress, SWAP_ABI, signer);
    await contract.swap(fromToken, toToken, ethers.parseEther(amount));
  };

  return (
    <div className="swap-interface">
      <select value={fromToken} onChange={(e) => setFromToken(e.target.value)}>
        <option value="KREDS">KREDS</option>
        <option value="ETH">ETH</option>
      </select>
      <input 
        type="number" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <select value={toToken} onChange={(e) => setToToken(e.target.value)}>
        <option value="ETH">ETH</option>
        <option value="KREDS">KREDS</option>
      </select>
      <button onClick={executeSwap}>Swap</button>
    </div>
  );
}