import React, { useState } from 'react';
import { useContract } from '../hooks/useContract';
import INTAX_SWAP_ABI from '../contracts/InTaxSwap.json';

export default function InTaxSwap({ swapAddress }) {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('KREDS');
  const [amount, setAmount] = useState('');
  const { contract } = useContract(swapAddress, INTAX_SWAP_ABI);

  const executeSwap = async () => {
    await contract.swapWithTax(
      fromToken,
      toToken,
      ethers.parseEther(amount)
    );
    alert('Swap executed (tax applied)');
  };

  return (
    <div className="intax-swap">
      <h3>🔄 Tax-Optimized Swap</h3>
      <select value={fromToken} onChange={(e) => setFromToken(e.target.value)}>
        <option value="ETH">ETH</option>
        <option value="KREDS">KREDS</option>
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <select value={toToken} onChange={(e) => setToToken(e.target.value)}>
        <option value="KREDS">KREDS</option>
        <option value="ETH">ETH</option>
      </select>
      <button onClick={executeSwap}>Swap</button>
    </div>
  );
}